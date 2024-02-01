import axios from 'axios';
import { getConfig } from '../../config';
import { transformation } from './shopify-transformer';


export const getShopifyProducts = async () => {

  const { storefrontAccessToken, apiEndpoint } = getConfig();
 

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
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
  });
  const responseData = await response.json();
  const data=responseData.data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    price: node.priceRange.maxVariantPrice.amount,
  }));
const  {transformedData} = transformation(data);

return transformedData;

};
