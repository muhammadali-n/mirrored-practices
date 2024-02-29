
import { getConfig } from '../../config';
import { performTransformation, TransformationResult } from '../common-transformer';
import { addToCartMutation, createCartMutation, editCartItemsMutation, getCartMutation, getCollectionProductsQuery, getProductsByCollectionQuery, removeFromCartMutation } from './shopify-query';
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
  variants?: any;
}

interface ShopifyProductResponse {
  data: {
    collection: {
      products: {
        edges: {
          node: {
            variants: any;
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

export const getProducts = async (): Promise<TransformationResult> => {
  const { commerceConfig } = getConfig();
  const storefrontAccessToken = commerceConfig.storefrontAccessToken
  const apiEndpoint = commerceConfig.apiEndpoint

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
    const { transformedData } = performTransformation(data, transformerConfig);
    return transformedData;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    throw error;
  }
};




export const getCollections = async (): Promise<TransformationResult> => {
  const { commerceConfig } = getConfig();

  const storefrontAccessToken = commerceConfig.storefrontAccessToken
  const apiEndpoint = commerceConfig.apiEndpoint

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

export const getProductByCollection = async (selectedCollection: string, sortKey: string, reverse: Boolean): Promise<ShopifyProduct[]> => {
  const { commerceConfig } = getConfig();

  const storefrontAccessToken = commerceConfig.storefrontAccessToken
  const apiEndpoint = commerceConfig.apiEndpoint

  const query = {
    query: getCollectionProductsQuery,
    variables: {
      handle: selectedCollection, sortKey: sortKey,
      reverse: reverse
    }
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
      variantId: node.variants.edges.map(({ node }: { node: any }) => node.id)
    }));
    return products;
  } catch (error) {
    console.error('Error fetching products by collection:', error);
    throw error;
  }
};

export const getProductsByHandle = async (handle: string): Promise<any> => {
  const { commerceConfig } = getConfig();

  const storefrontAccessToken = commerceConfig.storefrontAccessToken
  const apiEndpoint = commerceConfig.apiEndpoint

  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        availableForSale
        title
        description
        descriptionHtml
        options {
          id
          name
          values
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          ...image
        }
        images(first: 20) {
          edges {
            node {
              ...image
            }
          }
        }
        seo {
          ...seo
        }
        tags
        updatedAt
      }
    }
    
    fragment image on Image {
      originalSrc
      altText
    }

    fragment seo on SEO {
      title
      description
    }
  `;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables: { handle } }),
  };

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch product by handle. Status: ${response.status}`);
    }
    const responseData = await response.json();
    const data = responseData.data.productByHandle;
    
    const transformProductData = (data) => {
      return {
        id: data.id,
        handle: data.handle,
        availableForSale: data.availableForSale,
        title: data.title,
        description: data.description,
        descriptionHtml:data.descriptionHtml,
        price: data.priceRange.maxVariantPrice.amount,
        options: data.options.map(option => ({
          id: option.id,
          name: option.name,
          values: option.values
        })),
        featuredImage: {
          src: data.featuredImage.originalSrc,
          altText: data.featuredImage.altText || ''
        },
        images: data.images.edges.map(edge => ({
          src: edge.node.originalSrc,
          altText: edge.node.altText || ''
        })),
        variants: data.variants.edges.map(edge => ({
          id: edge.node.id,
          title: edge.node.title,
          availableForSale: edge.node.availableForSale,
          selectedOptions: edge.node.selectedOptions,
          price: edge.node.price.amount,
          currencyCode: edge.node.price.currencyCode,

        })),
        currencyCode: data.priceRange.minVariantPrice.currencyCode,
        highPrice: data.priceRange.maxVariantPrice.amount,
        lowPrice: data.priceRange.minVariantPrice.amount,
      };
    };
    const transformedData = transformProductData(data);


    return transformedData;

  } catch (error) {
    console.error('Error fetching product by handle:', error);
    throw error;
  }
};


export const getRelatedProductsById = async (productId: string): Promise<any[]> => {
  const { commerceConfig } = getConfig();
  const storefrontAccessToken = commerceConfig.storefrontAccessToken;
  const apiEndpoint = commerceConfig.apiEndpoint;

  const query = `
    query getProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId)
       {
        id
        handle
        availableForSale
        title
        description
        descriptionHtml
        options {
          id
          name
          values
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          ...image
        }
        images(first: 20) {
          edges {
            node {
              ...image
            }
          }
        }
        seo {
          ...seo
        }
        tags
        updatedAt
      }
    }
    
    fragment image on Image {
      originalSrc
      altText
    }

    fragment seo on SEO {
      title
      description
    }
  `;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables: { productId } }),
  };

  try {
    const response = await fetch(apiEndpoint, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch related products. Status: ${response.status}`);
    }
    const responseData = await response.json();
    const products = responseData.data.productRecommendations.map(({ id, title, handle, description, priceRange, featuredImage, currencyCode }) => ({
      id,
      title,
      handle,
      description,
      price: priceRange?.maxVariantPrice?.amount,
      imageSrc: featuredImage?.originalSrc,
      currencyCode
    }));

    return products;
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }
};

export { TransformationResult };


/*************************************
******* shopify cart start ***********
**************************************/

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type Edge<T> = {
  node: T;
};
export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: number;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: any;
  };
};
export type Connection<T> = {
  edges: Array<Edge<T>>;
};


export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: any;
    totalAmount: any;
    totalTaxAmount: any;
  };
  lines: Connection<CartItem>;
  totalQuantity: any;
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};


const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }
  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{
  ok: any; status: number; body: T
} | never> {
  const { commerceConfig } = getConfig();

  const storefrontAccessToken = commerceConfig.storefrontAccessToken
  const apiEndpoint = commerceConfig.apiEndpoint
  try {
    const result = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();
    console.log("body", body);

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    // if (isShopifyError(e)) {
    //   throw {
    //     cause: e.cause?.toString() || 'unknown',
    //     status: e.status || 500,
    //     message: e.message,
    //     query
    //   };
    // }

    throw {
      error: e,
      query
    };
  }
}
export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};
export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export async function createCart(): Promise<Cart> {

  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });
  console.log("resresres", res);


  return reshapeCart(res.body.data.cartCreate.cart);
}



// -----------shopify add to cart

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};


export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  try {
    console.log("Adding to cart...", lines);

    const res = await shopifyFetch<ShopifyAddToCartOperation>({
      query: addToCartMutation,
      variables: {
        cartId,
        lines,
      },
      cache: 'no-store',
    });

    console.log("Responsesssssssss:", res);

    if (!res.ok) {
      throw new Error(`Failed to add items to the cart. Status: ${res.status}`);
    }

    const data = reshapeCart(res.body.data.cartLinesAdd.cart);
    return data
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
}

// ******* shopify remove Cart *********

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

// ************ shopify get cart **********  

export const getCart = async (cartId: string) => {
  try {
    const { commerceConfig } = getConfig();

    const storefrontAccessToken = commerceConfig.storefrontAccessToken;
    const apiEndpoint = commerceConfig.apiEndpoint;

    const query = getCartMutation;

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables: { cartId } }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Shopify cart. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("dddd", data);
    const checkoutUrl = data.data.cart.checkoutUrl
    const products = removeEdgesAndNodes(data.data.cart.lines)
    const cost = data.data.cart.cost

    console.log("checkoutUrl", checkoutUrl);

    console.log(" data from getcart", data);

    return { products, cost, checkoutUrl };
  } catch (error) {
    console.error("Error:", error.message);
  }
};


export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}


/*************************************
******* shopify cart end ***********
**************************************/




// export async function createCheckout() {
//   console.log("createCheckout");
  

//   const { commerceConfig } = getConfig();

//   const storefrontAccessToken = commerceConfig.storefrontAccessToken
//   const apiEndpoint = commerceConfig.apiEndpoint
//   const mutation = `
//       mutation checkoutCreate($input: CheckoutCreateInput!) {
//           checkoutCreate(input: $input) {
//               checkout {
//                   id
//                   webUrl
//               }
//               checkoutUserErrors {
//                   field
//                   message
//               }
//               queueToken
//           }
//       }
//   `;

//   const input = {
//     "allowPartialAddresses": true,
//     "customAttributes": [
//       {
//         "key": "YourCustomAttributeKey",
//         "value": "YourCustomAttributeValue"
//       }
//     ],
//     "email": "customer@example.com",
//     "lineItems": [
//       {
//         "customAttributes": [
//           {
//             "key": "LineItemCustomAttributeKey",
//             "value": "LineItemCustomAttributeValue"
//           }
//         ],
//         "quantity": 1,
//         "variantId": "gid://shopify/ProductVariant/44673052934366"
//       }
//     ],
//     "note": "Any additional notes or instructions",
//     "presentmentCurrencyCode": "STD",
//     "shippingAddress": {
//       "address1": "123 Main St",
//       "address2": "Apt 4",
//       "city": "Cityville",
//       "company": "ABC Inc",
//       "country": "United States",
//       "firstName": "John",
//       "lastName": "Doe",
//       "phone": "123-456-7890",
//       "province": "CA",
//       "zip": "12345"
//     },
//   };

//   const variables = {
//     input,
//   };

//   try {
//     const response = await fetch(apiEndpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
//       },
//       body: JSON.stringify({
//         query: mutation,
//         variables,
//       }),
//     });
    
//     const data = await response.json();
//     console.log("response", data);

//     const checkout = data.data.checkoutCreate.checkout;
//     console.log('Checkout ID:', checkout.id);
//     console.log('Checkout URL:', checkout.webUrl);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }


export const createCheckout = async (): Promise<CheckoutResult> => {
  console.log("hiii");
  const { commerceConfig } = getConfig();
  const storefrontAccessToken = commerceConfig.storefrontAccessToken;
  const apiEndpoint = commerceConfig.apiEndpoint;

  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
        }
        userErrors {
          field
          message
        }
        checkoutUserErrors {
          field
          message
          code
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
      body: JSON.stringify({ query: mutation }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create Shopify checkout. Status: ${response.status}`);
    }

    const responseData: ShopifyCheckoutResponse = await response.json();
    console.log("############",responseData);
    const checkoutId: string = responseData.data.checkoutCreate.checkout.id;
    console.log("@@@@@@@@@",checkoutId)

    return { checkoutId };
  } catch (error) {
    console.error('Error creating Shopify checkout:', error);
    throw error;
  }
};

type CheckoutResult = {
  checkoutId: string;
};

type ShopifyCheckoutResponse = {
  data: {
    checkoutCreate: {
      checkout: {
        id: string;
      };
    };
  };
};


export const addProductToCheckout = async (checkoutId: string, productId: string, quantity: number = 1): Promise<AddToCheckoutResult> => {
  const { commerceConfig } = getConfig();
  const storefrontAccessToken = commerceConfig.storefrontAccessToken;
  const apiEndpoint = commerceConfig.apiEndpoint;

  const mutation = `
    mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          lineItems(first: 5) {
            edges {
              node {
                title
                variant {
                  id
                  priceV2 {
                    amount
                  }
                }
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    checkoutId,
    lineItems: [{ variantId: productId, quantity }],
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product to Shopify checkout. Status: ${response.status}`);
    }

    const responseData: ShopifyAddToCheckoutResponse = await response.json();
    const updatedCheckout = responseData.data.checkoutLineItemsAdd.checkout;

    return { updatedCheckout };
  } catch (error) {
    console.error('Error adding product to Shopify checkout:', error);
    throw error;
  }
};

// Define types for better clarity
type AddToCheckoutResult = {
  updatedCheckout: ShopifyCheckout;
};

type ShopifyAddToCheckoutResponse = {
  data: {
    checkoutLineItemsAdd: {
      checkout: ShopifyCheckout;
    };
  };
};

type ShopifyCheckout = {
  id: string;
  lineItems: {
    edges: {
      node: {
        title: string;
        variant: {
          id: string;
          priceV2: {
            amount: number;
          };
        };
        quantity: number;
      };
    }[];
  };
};


export const updateShippingAddress = async (
  checkoutId: string,
  shippingAddress: ShopifyShippingAddress
): Promise<UpdateShippingAddressResult> => {
  const { commerceConfig } = getConfig();
  const storefrontAccessToken = commerceConfig.storefrontAccessToken;
  const apiEndpoint = commerceConfig.apiEndpoint;

  const mutation = `
  mutation updateShippingAddress($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
    checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
      checkout {
        shippingAddress {
          address1
          address2
          city
          company
          country
          firstName
          lastName
          province
          zip
        }
      }
      userErrors {
        field
        message
      }
      checkoutUserErrors {
        field
        message
        code
      }
    }
  }
`;

  const variables = {
    checkoutId,
    shippingAddress,
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update shipping address in Shopify checkout. Status: ${response.status}`);
    }
 console.log("reddd",response);
    const responseData: ShopifyUpdateShippingAddressResponse = await response.json();
    console.log("oooo",responseData)
    const updatedCheckout = responseData?.data?.checkoutShippingAddressUpdate?.checkout;

    return { updatedCheckout };
  } catch (error) {
    console.error('Error updating shipping address in Shopify checkout:', error);
    throw error;
  }
};

type UpdateShippingAddressResult = {
  updatedCheckout: ShopifyCheckout;
};

type ShopifyUpdateShippingAddressResponse = {
  data: {
    checkoutShippingAddressUpdate: {
      checkout: ShopifyCheckout;
    };
  };
};

type ShopifyShippingAddress = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  country: string;
  province: string;
  zip: string;
};


export const updateEmail = async (
  checkoutId: string,
  email: string
): Promise<UpdateEmailResult> => {
  const { commerceConfig } = getConfig();
  const storefrontAccessToken = commerceConfig.storefrontAccessToken;
  const apiEndpoint = commerceConfig.apiEndpoint;

  const mutation = `
    mutation updateEmail($checkoutId: ID!, $email: String!) {
      checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
        checkout {
          checkoutId,
          email
        }
        checkoutUserErrors {
          # CheckoutUserError fields
        }
      }
    }
  `;

  const variables = {
    checkoutId,
    email,
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update email in Shopify checkout. Status: ${response.status}`);
    }

    const responseData: ShopifyUpdateEmailResponse = await response.json();
    const updatedCheckout = responseData?.data?.checkoutEmailUpdateV2?.checkout;
    console.log("updatedCheckout", updatedCheckout);
    

    return { updatedCheckout };
  } catch (error) {
    console.error('Error updating email in Shopify checkout:', error);
    throw error;
  }
};

type UpdateEmailResult = {
  updatedCheckout: ShopifyCheckout;
};

type ShopifyUpdateEmailResponse = {
  data: {
    checkoutEmailUpdateV2: {
      checkout: ShopifyCheckout;
      checkoutUserErrors: CheckoutUserError[];
    };
  };
};

type CheckoutUserError = {
  field: string;
  message: string;
};
