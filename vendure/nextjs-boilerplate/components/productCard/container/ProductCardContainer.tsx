import React from 'react'
import ProductCardLayout from '../layout/ProductCardLayout'

export default function ProductCardContainer({ product }:{product:any}) {
  return (
      <ProductCardLayout product= { product }/>
  )
}
