import { getConfig } from '../config';

//for identify which type of CMS is configured
export const getContent = async <T>(apiCall: GenericApiCall<T>, ...args: any[]): Promise<T[]> => {
  const { cmsConfig } = getConfig()
  switch (cmsConfig?.type) {
    case "sanity":
      return await apiCall(...args);
    case 'strapi':
    //add more content cms
    default:
  }
}

type GenericApiCall<T> = (...args: any[]) => Promise<T[]>;

//for identify which type of Commerce is configured 
export const performCommonIntegration = async <T>(apiCall: GenericApiCall<T>, ...args: any[]): Promise<T[]> => {
  const { commerceConfig } = getConfig();
  
  switch (commerceConfig?.type) {
    case 'shopify':
      return await apiCall(...args); 
    case 'saleor':
    default:
  }
};

