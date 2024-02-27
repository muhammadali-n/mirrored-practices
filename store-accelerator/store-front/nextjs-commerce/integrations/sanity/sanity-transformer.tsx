const transformSanityCartData = (data: any) => {
    const transformedData = {
        buttonName: data[0]?.sections?.translation,
        buttonColor: data[0]?.sections?.ButtonColor.hex,
        shippingField: data[0]?.shipping_fields,
        taxField: data[0]?.taxes_fields,
        title: data[0]?.title,
        totalField: data[0]?.total_fields
    }

    return transformedData;
};

export default transformSanityCartData;
