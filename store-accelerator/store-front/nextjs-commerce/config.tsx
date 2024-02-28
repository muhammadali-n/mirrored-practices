import type from './integrations/constants.json'
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
  };
  vendure:{
    type:any
    apiEndpoint: any
  },
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
  vendure:{
    type: process.env.NEXT_PUBLIC_VENDURE_TYPE,
    apiEndpoint: process.env.NEXT_PUBLIC_VENDURE_API_ENDPOINT,
  },
};

const fetchProvider = {
  //API to fetch products
  "getProductDetails" : type.TYPE_SPECIFICATION.VENDURE_TYPE,
  //API to fetch Collections
  "getCollectionDetails": type.TYPE_SPECIFICATION.SHOPIFY_TYPE,
  //API to fetch Products (image, name, price) for a give collection
  "getCollectionProductDetails": type.TYPE_SPECIFICATION.SHOPIFY_TYPE
}

//configuration
export const getConfig = (providerType: String) => {
  const commerceType: String = providerType || 'shopify';
  const cmsType: string = process.env.NEXT_PUBLIC_CMS_TYPE || 'sanity';
  return ({
    cmsConfig: configurations[cmsType],
    commerceConfig: configurations[commerceType],
  }) 
};

export const fetchProviderConfig = (methodName: String): String => {
  //based on the methodName we have to get the Provider
  const providerType : String = fetchProvider[methodName];
  return providerType;
}