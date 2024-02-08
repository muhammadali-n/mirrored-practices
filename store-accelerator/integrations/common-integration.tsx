import { getConfig } from '../config';
import { getShopifyProducts } from './shopify/shopify-integration';
import { getSanity } from './sanity/sanity-integration'


//for identify which type of Commerce is configured 
export const performCommonIntegration = async () => {
  const { commerceConfig } = getConfig();

  const storefrontAccessToken =commerceConfig.storefrontAccessToken
  const apiEndpoint= commerceConfig.apiEndpoint
  switch (commerceConfig?.type) {
    case 'shopify':
      console.log("common shopify", commerceConfig);

      return await getShopifyProducts(storefrontAccessToken, apiEndpoint);
    case 'saleor':
    default:
      throw new Error(`Invalid integration type: ${commerceConfig?.type}`);
  }
};

//for identify which type of CMS is configured
export const getContent = async (params: any) => {
  console.log("integration");
  const { cmsConfig } = getConfig()
  console.log("cmsConfig", cmsConfig);

  switch (cmsConfig?.type) {
    case "sanity":
      return await getSanity(params);
    case 'strapi':
    //add more content cms
    default:
      throw new Error(`Invalid integration type: ${cmsConfig?.type}`);
  }
}