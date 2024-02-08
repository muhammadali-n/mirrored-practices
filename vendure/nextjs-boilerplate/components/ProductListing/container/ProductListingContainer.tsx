import React from 'react'
import ProductListLayout from '../layout/ProductListLayout';
import NotFound from '@/components/common/NotFound';

export default function ProductListingContainer({ response, facetsResponse }: { response: any, facetsResponse :any}) {

  return (
  
    <ProductListLayout
      response={response} />
  )
}
