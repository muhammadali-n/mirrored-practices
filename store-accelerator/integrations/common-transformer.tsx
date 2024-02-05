import transformerConfig from '../integrations/shopify/shopify-transform-config.json';

const performTransformation = (data: any[]): { transformedData: any[] } => {
  if (!data) {
    throw new Error('Input data is undefined');
  }

  const transformedData = data.map((item) => {
    const transformedItem: Record<string, any> = {};

    transformerConfig.transformer.forEach((transform: TransformConfig) => {
      const { inputFieldName, outputFieldName, convertTo } = transform;
      let value;

      if (item.hasOwnProperty(inputFieldName)) {
        value = item[inputFieldName];

        if (convertTo === 'integerToString') {
          value = String(parseInt(value, 10));
        } else if (convertTo === 'jsonArrayToList') {
          value = value.map((item: any) => item.toString());
        } else if (convertTo === 'stringToInteger') {
          value = parseInt(value, 10);
        }

        transformedItem[outputFieldName] = value;
      }
    });

    return transformedItem;
  });

  return {
    transformedData,
  };
};

export { performTransformation };

  