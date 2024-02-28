import { fetchProviderConfig, getConfig } from '../config';
import { getProductByCollection, shopifyApi } from './shopify/shopify-integration';
import vendureApi from './vendure/vendure-integration';

type GenericApiCall<T> = (...args: any[]) => Promise<T[]>;

//for identify which type of CMS is configured
export const getContent = async<T>(apiCall: GenericApiCall<T>, ...args: any[]): Promise<T[] > => {
  const { cmsConfig } = getConfig()
  switch (cmsConfig?.type) {
    case "sanity":
      return await apiCall(...args);
    case 'strapi':
    //add more content cms
    default:
  }
}

//for identify which type of Commerce is configured 
export const performCommonIntegration = async (methodName: String, ...args: any[]): Promise<T[]> => {
  const provider  = fetchProviderConfig(methodName);
  switch (provider) {
    case 'shopify':{
      const {commerceConfig} = getConfig(provider);
      const {apiEndpoint, storefrontAccessToken} = commerceConfig
      return await shopifyApi(apiEndpoint, storefrontAccessToken,methodName,...args)
    }  
    case 'vendure': {
      const {commerceConfig} = getConfig(provider);
      const { apiEndpoint } = commerceConfig
      return await vendureApi(apiEndpoint, methodName,...args);
    } 
    default:
  }
};

