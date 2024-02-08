

import ProductDetailsContainer from '@/components/productDetailsPage/container/ProductDetailsContainer';
import React from 'react';

export default function ProductDetailsPage({ response }:{response:any}) {
    return (
        <ProductDetailsContainer response={response} />
)
}
