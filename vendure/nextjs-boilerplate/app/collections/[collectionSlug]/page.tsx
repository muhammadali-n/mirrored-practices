import ProductList from '@/layout/ProductList';
import { VendureService } from '@/services/vendure.service';
import React from 'react' 

async function plpContent( params: string,ids: []) {
  'use server';
  const gqService = new VendureService();
  const response = await gqService.fetchCollectionProducts(params,ids);
  return response;
}

export default async function page({ params }: { params: { collectionSlug: String }; }) {
  const gqService = new VendureService();
  const facetsResponse: any = await gqService.fetchfacets(params.collectionSlug);
  return (<>
    <div>
      <ProductList 
        collectionSlug={params.collectionSlug }
        facetsResponse={facetsResponse}
        plpContent={plpContent}
      /></div>
  </>
  )
}
