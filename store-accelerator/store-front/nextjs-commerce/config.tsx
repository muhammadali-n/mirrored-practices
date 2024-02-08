export interface Configurations {
  shopify: {
    type: any,
    apiEndpoint: any;
    storefrontAccessToken: any;
  };
  sanity: {
    type: any,
    projectId: any;
    dataset: any;
    apiVersion: any;
    perspective: any;
    useCdn: any
  }
}

export const configurations: Configurations = {
  shopify: {
    type: process.env.NEXT_PUBLIC_SHOPIFY_TYPE,
    apiEndpoint:process.env.NEXT_PUBLIC_SHOPIFY_API_ENDPOINT,
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  },
  sanity: {
    type: process.env.NEXT_PUBLIC_SANITY_TYPE,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATA_SET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    perspective: process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE,
    useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN
  },
};

//configuration
export const getConfig = () => {
  
  const commerceIntegrationType: string = process.env.NEXT_PUBLIC_COMMERCE_TYPE || 'shopify';
  const cmsIntegrationType: string = process.env.NEXT_PUBLIC_CMS_TYPE || 'sanity';

  return ({
    cmsConfig: configurations[cmsIntegrationType],
    commerceConfig: configurations[commerceIntegrationType],
  })

};
