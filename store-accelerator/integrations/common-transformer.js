import transformerConfig from './shopify/shopify-transform-config.json';

const performTransformation = (data) => {

    if (!data) {
        throw new Error('Input data is undefined');
    }

    const transformedData = data.map((item) => {
        const data = {};

        transformerConfig.transformer.forEach((transform) => {
            const { inputFieldName, outputFieldName, convertTo } = transform;
            let value;

            if (item.hasOwnProperty(inputFieldName)) {
                value = item[inputFieldName];

                if (convertTo === 'integerToString') {
                    value = String(parseInt(value, 10));
                } else if (convertTo === 'jsonArrayToList') {
                    value = value.map((item) => item.toString());
                } else if (convertTo === 'stringToInteger') {
                    value = parseInt(value, 10);
                }

                data[outputFieldName] = value;
            }
        });

        return data;
    });

    return {
        transformedData,
    };

};

export { performTransformation };


