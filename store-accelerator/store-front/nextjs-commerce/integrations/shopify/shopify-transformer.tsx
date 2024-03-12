import { performObjectTransformation, performTransformation } from "../common-transformer";

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

  const performCartTransformation = (data, shopifyTransformConfig): {} => {
    let frontendReturnResponse = {}
    let totalQuantity = 0;
    const transformedResponse = performObjectTransformation(data?.data?.cart, shopifyTransformConfig);
    if(transformedResponse && transformedResponse["items"]){
      transformedResponse["items"].forEach((item)=> {
        const overallCost = parseInt(item?.quantity,10) * parseInt(item?.unitCost,10);
        totalQuantity = totalQuantity + item.quantity;
        item["overallCost"] = overallCost;
    })
    transformedResponse["totalQuantity"] = totalQuantity;
    frontendReturnResponse["current"] = transformedResponse;
    return frontendReturnResponse;
  }
}
  
export { productTransformation, performCartTransformation };