import ProductDetailsPage from '@/layout/ProductDetailsPage';
import { VendureService } from '@/services/vendure.service';
import React from 'react'

export default async function page({ params }: { params: { productSlug: string }; }) {
    const gqService = new VendureService();
  const response: any = await gqService.fetchProductDetails(params.productSlug);
  return (
      <div>
          <ProductDetailsPage response={response } />
         </div>
  )
}
