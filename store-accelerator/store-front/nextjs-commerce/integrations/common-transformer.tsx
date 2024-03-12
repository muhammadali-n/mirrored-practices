import { transform } from "next/dist/build/swc"

interface CustomPage {
  id: string 
  title: string 
  type: string
  sections: any[] 
  locale: string 
}

const performTransformation = (data: any[], additionalArgs:any): { transformedData: any[] ,transformedHomeData: any[]} => {
  if (!data) {
    throw new Error('Input data is undefined');
  }
  const transformedData = data.map((item) => {
    const transformedItem: Record<string, any> = {};
    additionalArgs.transformer.forEach((transform:any) => {
      const { inputField, outputField, convertTo } = transform;
      let value;
      if (item.hasOwnProperty(inputField)) {
        value = item[inputField];
        if (convertTo === 'integerToString') {
          value = String(parseInt(value, 10));
        } else if (convertTo === 'jsonArrayToList') {
          value = value.map((item: any) => item.toString());
        } else if (convertTo === 'stringToInteger') {
          value = parseInt(value, 10);
        }
        transformedItem[outputField] = value;
      }
    });
    return transformedItem;
  });
  const transformedHomeData: any[] = []; 
  return {
    transformedData,transformedHomeData
  };
};


export function dataTransformer(data: any, transformerJsonConfig: any) {
console.log("hiii")

function findProp(obj: any, prop: (string | string[]), defval: any) {
  if (typeof defval === 'undefined') defval = null;
  if (!Array.isArray(prop)) prop = [prop]; 
  for (var i = 0; i < prop.length; i++) {
      if (typeof obj[prop[i]] === 'undefined') return defval;
      obj = obj[prop[i]];
      if (Array.isArray(obj)) {
          return obj.map(item => findProp(item, prop.slice(i + 1), defval));
      }
  }
  return obj;
}


  const newItems = data.map((item: any) => {
    var transformItem: Record<string, any> = {};
    transformerJsonConfig.transformer.forEach((field: any) => {
      const { inputFieldName, outputFieldName } = field;
      const inputValue = findProp(item, inputFieldName.split('.'), null);
      transformItem[outputFieldName] = inputValue;
    });
    return transformItem;
  });

  return newItems;
}

function findProp(obj, prop){
  const chunks = prop.split('.');
  for (var i = 0; i < chunks.length; i++) {
      if(typeof obj[chunks[i]] == 'undefined')
          return null;
      obj = obj[chunks[i]];
  }
  return obj;
}

const performFieldCheck = (item, inputString) => {
  if(findProp(item, inputString) !== null){
    return true
  }else return false
}

const performListTransformation = (data:any[], transformConfig:any) => {
  const transformedList = [];
  data?.map((item)=> {
    var transformObj = {};
    transformConfig.transformer.forEach((field) => {
      var propertyValue = {} || '' || [];
      const {inputField, outputField} = field;
      if(inputField.indexOf('.') > -1){
        if(performFieldCheck(item, inputField)){
          propertyValue = findProp(item,inputField);
          performCommonTransformation(propertyValue, outputField, transformConfig, transformObj);
        }
      }else{
        if(item.hasOwnProperty(inputField)){
          performCommonTransformation(item[inputField],outputField,transformConfig,transformObj);
        }
      }
    });
    transformedList.push(transformObj);
  });
  return transformedList;
}

const performObjectTransformation = (data, transformConfig)=> {
  var transformObj = {};
   transformConfig.transformer.forEach((field) => {
    var propertyValue = {} || '' || [];
    const {inputField,outputField} = field;
    if(inputField.indexOf('.')>-1){
      if(performFieldCheck(data, inputField)){
        propertyValue = findProp(data, inputField);
        performCommonTransformation(propertyValue, outputField, transformConfig, transformObj);
      }
    }
    else{
      if(data.hasOwnProperty(inputField)){
        performCommonTransformation(data[inputField], outputField, transformConfig, transformObj);
      }
    }
   })
   console.log("transformObj:", transformObj);
   return transformObj;
}

const performCommonTransformation = (item, outputField, transformConfig, transformObj)=> {
  if(Array.isArray(item)){
    transformObj[outputField] = performListTransformation(item, transformConfig);
  }else if(typeof item === 'object'){
    transformObj[outputField] = performObjectTransformation(item, transformConfig);
  }else{
    transformObj[outputField] = item;
    console.log(transformObj);
  }
}

// custom ui for storefront
export const customUi = (getPageData: any[]): CustomPage | undefined => {
  if (getPageData.length > 0) {
    const page = getPageData[0];
    const pageData: CustomPage = {
      id: page?.id,
      title: page?.title,
      type: page?.type,
      sections: page?.sections,
      locale: page?.locale,
    };
    return pageData;
  }
  return undefined;
};

export { performTransformation, performListTransformation, performObjectTransformation};  