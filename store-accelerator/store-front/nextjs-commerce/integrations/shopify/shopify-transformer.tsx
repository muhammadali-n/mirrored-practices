import { Cart, Connection, ShopifyCart } from "./shopify-integration";

interface ProductData {
    id: string;
  }
  
  interface TransformedProduct {
    objectID: string;
  }
  
  const productTransformation = (data: ProductData[]): TransformedProduct[] => {
    const transformedData: TransformedProduct[] = data.map((item) => ({
      objectID: item.id,
    }));
    return transformedData;
  };

  export const removeEdgesAndNodes = (array: Connection<any>) => {
   const data= array.lines?.edges.map((edge) => edge?.node);
   return data;
  };

  export const  reshapeCart = (cart: ShopifyCart): Cart => {
    if (!cart.cost?.totalTaxAmount) {
      cart.cost.totalTaxAmount = {
        amount: '0.0',
        currencyCode: 'USD'
      };
    }
    return {
      ...cart,
      lines: removeEdgesAndNodes(cart.lines)
    };
  };
  
  export { productTransformation };