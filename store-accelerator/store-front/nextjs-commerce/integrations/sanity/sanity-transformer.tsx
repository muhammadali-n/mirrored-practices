export  const transformSanityCartData = (data: any) => {
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

export const transformSanityPaymentData = (data: any) => {
    const transformedData = {
        title: data[0]?.title?.title,
        CODTitle: data[0]?.cod?.title,
        description:data[0]?.description?.description
    }
    return transformedData
}

export const transformSanityShipmentData = (data: any) => {
    const transformedData = {
       contact:data[0]?.shippingInfo?.contact,
       shippingTo:data[0]?.shippingInfo?.shippingTo,
       change:data[0]?.shippingInfo?.contact,
       economy:data[0]?.shippingMethod?.economy,
       standard:data[0]?.shippingMethod?.standard,
       title:data[0]?.shippingMethod?.title
    }
    return transformedData
}

