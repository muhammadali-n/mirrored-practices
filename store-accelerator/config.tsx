export interface Configurations {
  shopify: {
    apiEndpoint: string;
    storefrontAccessToken: string;
  };
}

export const configurations: Configurations = {
  shopify: {
    apiEndpoint: 'https://mozanta-theme-store.myshopify.com/api/graphql.json',
    storefrontAccessToken: '3a582815a77119eacfdd9d13abaa9e25',
  },
};

export const getConfig = () => {
  const integrationType: string = process.env.INTEGRATION_TYPE || 'shopify';
  const config = configurations[integrationType];

  if (!config) {
    throw new Error(`Invalid integration type: ${integrationType}`);
  }

  return { integrationType, ...config };
};
