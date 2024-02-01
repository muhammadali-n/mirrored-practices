const performTransformation = (data,transformerConfig) => {

    if (!data) {
        throw new Error('Input data is undefined');
    }

    const transformedData = data.map((product) => {
        const transformedProduct = {};

        transformerConfig.transformer.forEach((transform) => {
            const { inputFieldName, outputFieldName, convertTo } = transform;
            let value;

            if (product.hasOwnProperty(inputFieldName)) {
                value = product[inputFieldName];

                if (convertTo === 'integerToString') {
                    value = String(parseInt(value, 10));
                } else if (convertTo === 'jsonArrayToList') {
                    value = value.map((item) => item.toString());
                } else if (convertTo === 'stringToInteger') {
                    value = parseInt(value, 10);
                }

                transformedProduct[outputFieldName] = value;
            }
        });

        return transformedProduct;
    });

    return {
        transformedData,
    };

};

export { performTransformation };


