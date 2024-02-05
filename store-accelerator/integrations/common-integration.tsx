import { getConfig, Config } from '../config';
import { getShopifyProducts, ShopifyProduct } from './shopify/shopify-integration';

// import { getSaloerProducts } from './saloerIntegration';

export const performCommonIntegration = async (): Promise<ShopifyProduct[]> => {
  const { integrationType }: Config = getConfig();

  switch (integrationType) {
    case 'shopify':
      return await getShopifyProducts();
    // case 'saloer':
    //   return await getSaloerProducts();
    default:
      throw new Error(`Invalid integration type: ${integrationType}`);
  }
};
