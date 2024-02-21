
import { getConfig} from '../../config';
import { performTransformation, TransformationResult} from '../common-transformer';
import {getCollectionProductsQuery, getProductsByCollectionQuery} from './shopify-query';
import transformerConfig from './shopify-transform-config.json';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
}
interface ShopifyCollection {
  id: string;
  title: string;
 
}

interface ShopifyProductId {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
}


interface ShopifyProductsResponse {
  data: {
    products: {
      edges: {
        node: {
          images: any;
          id: string;
          title: string;
          handle: string;
          description: string;
          priceRange: {
            maxVariantPrice: {
              amount: number;
            };
          };
        };
      }[];
    };
  };
}

interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: {
        node: {
         
          id: string;
          title: string;
         
        };
      }[];
    };
  };
}

interface ShopifyProducts {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
  imageSrc?: string;
}

interface ShopifyProductResponse {
  data: {
    collection: {
      products: {
        edges: {
          node: {
            id: string;
            title: string;
            handle: string;
            description: string;
            priceRange: {
              maxVariantPrice: {
                amount: number;
              };
            };
            images: {
              edges: {
                node: {
                  originalSrc: string;
                  altText: string;
                };
              }[];
            };
          };
        }[];
      };
    };
  };
}

interface ShopifyProductIdResponse {
  data: {
      edges: {
        node: {
          images: any;
          id: string;
          title: string;
          handle: string;
          description: string;
          priceRange: {
            maxVariantPrice: {
              amount: number;
            };
          };
        };
      }[];
    };
  };

export const getProducts = async (): Promise<TransformationResult> => {
  const { commerceConfig } = getConfig();
  const storefrontAccessToken =commerceConfig.storefrontAccessToken
  const apiEndpoint= commerceConfig.apiEndpoint

  const query = `
    {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
  `;

  

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Shopify products. Status: ${response.status}`);
    }

    const responseData: ShopifyProductsResponse = await response.json();
    const data: ShopifyProduct[] = responseData.data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      price: node.priceRange.maxVariantPrice.amount,
      imageSrc: node.images.edges[0]?.node.originalSrc,
    }));
    const { transformedData } = performTransformation(data , transformerConfig);
    return transformedData;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    throw error;
  }
};




export const getCollections = async (): Promise<TransformationResult> => {
  const { commerceConfig } = getConfig();

  const storefrontAccessToken =commerceConfig.storefrontAccessToken
  const apiEndpoint= commerceConfig.apiEndpoint

  const query = `
  {
    collections(first: 10, sortKey: TITLE, reverse: false) {
      edges {
        node {
          id
          title
          products(first: 5) {
            edges {
              node {
                id
                title
                descriptionHtml
                variants(first: 1) {
                  edges {
                    node {
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  `;

  

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Shopify products. Status: ${response.status}`);
    }

    const responseData: ShopifyCollectionsResponse = await response.json();
    const data: ShopifyCollection[] = responseData.data.collections.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
    }));

    // const data: ShopifyCollection[] = responseData.data.collections.edges
    // .filter(({ node }) => node.products.edges.length > 0) // Filter collections with products
    // .map(({ node }) => ({
    //   id: node.id,
    //   title: node.title,
    // }));
   
    const { transformedData } = performTransformation(data, transformerConfig);

    return transformedData;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    throw error;
  }
};

export const getProductByCollection = async (selectedCollection: string,sortKey: string ,reverse:Boolean): Promise<ShopifyProduct[]> => {
  const { commerceConfig } = getConfig();

  const storefrontAccessToken =commerceConfig.storefrontAccessToken
  const apiEndpoint= commerceConfig.apiEndpoint

  const query = {
    query: getCollectionProductsQuery,
    variables: { handle: selectedCollection , sortKey: sortKey,
      reverse: reverse }
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify(query),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products by collection. Status: ${response.status}`);
    }

    const responseData: ShopifyProductResponse = await response.json();
    const products: ShopifyProducts[] = responseData.data.collection.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      price: node.priceRange.maxVariantPrice.amount,
      imageSrc: node.images.edges[0]?.node.originalSrc,
    }));
    // const { transformedData } = performTransformation(products);

    return products;
  } catch (error) {
    console.error('Error fetching products by collection:', error);
    throw error;
  }
};

export const getProductById = async (productId: string): Promise<TransformationResult> => {
  const { commerceConfig } = getConfig();
  const storefrontAccessToken = commerceConfig.storefrontAccessToken;
  const apiEndpoint = commerceConfig.apiEndpoint;

  const query = `
    {
      product(id: "${productId}") {
        id
        title
        handle
        description
        priceRange {
          maxVariantPrice {
            amount
          }
        }
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Shopify product. Status: ${response.status}`);
    }

    const responseData: ShopifyProductIdResponse = await response.json();
    const data: ShopifyProductId[] = responseData.data.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      price: node.priceRange.maxVariantPrice.amount,
      imageSrc: node.images.edges[0]?.node.originalSrc,
    }));
    const { transformedData } = performTransformation(data , transformerConfig);
    return transformedData;
  } catch (error) {
    console.error('Error fetching Shopify product:', error);
    throw error;
  }
};


export { TransformationResult };

