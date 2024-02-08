import ProductCardContainer from '@/components/productCard/container/ProductCardContainer'
import React from 'react'

export default function ProductListLayout({ response }:{response:any}) {
    
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {response?.search?.items.map((product: { id: React.Key | null | undefined }) => (
              <ProductCardContainer key={product.id} product={product} />
          ))}
      </div>
  )
}
