import { getConfig } from '../config';
import { getShopifyProducts } from './shopify/shopify-integration';

// import { getSaloerProducts } from './saloerIntegration';

export const performCommonIntegration = async () => {
  const { integrationType } = getConfig();

  switch (integrationType) {
    case 'shopify':
      return await getShopifyProducts();
    case 'saloer':
      return await getSaloerProducts();
    default:
      throw new Error(`Invalid integration type: ${integrationType}`);
  }
};