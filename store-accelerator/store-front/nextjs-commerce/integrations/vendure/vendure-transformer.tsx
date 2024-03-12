import { performObjectTransformation } from "../common-transformer";

function dataTransformer(data: any, transformerJsonConfig: any) {
    //var subStrings = []
    const newItems = data?.map((item: any) => {
        var transformItem: Record<string, any> = {}
        transformerJsonConfig.transformFields.forEach((field: any) => {
            const { inputField, outputField } = field;
            if(item[inputField] && inputField === "product"){
                transformItem[outputField] = item[inputField].featuredAsset.preview
            }
            else{
                transformItem[outputField] = item[inputField]
            }
        });
        return transformItem;
    })
    return newItems;
}

const performCartTransformation = (data, transformerConfig) => {
    let finalResponse = {}
    let transformedResponse = performObjectTransformation(data?.data?.activeCart, transformerConfig);
    finalResponse["current"] = transformedResponse;
    return finalResponse;
}

export { dataTransformer , performCartTransformation }