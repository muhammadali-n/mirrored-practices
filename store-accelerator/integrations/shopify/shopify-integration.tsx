
import { getConfig, Config } from '../../config';
import { performTransformation, TransformationResult } from '../common-transformer';
import transformShopify from "./shopify-transform-config.json"
interface ShopifyProduct {
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

export const getShopifyProducts = async (storefrontAccessToken: any,apiEndpoint:any): Promise<TransformationResult> => {
  // const { storefrontAccessToken, apiEndpoint }: Config = getConfig();
  console.log("storefrontAccessToken", storefrontAccessToken);
  console.log("apiEndpoint", apiEndpoint);


  const query = `
    {
        products(first: 5) {
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
    }));
    console.log("data",data)
    const { transformedData } = performTransformation(data,transformShopify);

    return transformedData;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    throw error;
  }
};

export { TransformationResult };

