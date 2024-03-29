import React from 'react'

import { Grid, Typography } from '@mui/material'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useTranslation } from 'next-i18next'

import { ProductCard } from '@/components/product'
import { useGetProducts } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'

import type { Product } from '@/lib/gql/types'

export interface ProductRecommendationsProps {
  title: string
  productCodes: Array<string>
}

const ProductRecommendations = (props: ProductRecommendationsProps) => {
  const { title, productCodes } = props
  const { t } = useTranslation('common')
  const { getProductLink } = uiHelpers()
  const { data: productSearchResult } = useGetProducts(productCodes)
  const products = productSearchResult?.items as Product[]

  return (
    <>
      {productCodes?.length > 0 && (
        <Grid item xs={12} sx={{ backgroundColor: 'grey.100', p: { xs: 1, md: 5 }, marginY: 2 }}>
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
          <Splide
            aria-label="My Favorite Images"
            options={{
              autoWidth: true,
              autoHeight: true,
              gap: 25,
              pagination: false,
              padding: 20,
              wheel: true,
              wheelSleep: 1000,
            }}
          >
            {products?.map((product) => {
              return (
                <SplideSlide key={product?.productCode}>
                  <ProductCard
                    imageUrl={
                      productGetters.getCoverImage(product) &&
                      productGetters.handleProtocolRelativeUrl(
                        productGetters.getCoverImage(product)
                      )
                    }
                    link={getProductLink(product?.productCode as string)}
                    price={t<string>('currency', {
                      val: productGetters.getPrice(product).regular,
                    })}
                    {...(productGetters.getPrice(product).special && {
                      salePrice: t<string>('currency', {
                        val: productGetters.getPrice(product).special,
                      }),
                    })}
                    title={productGetters.getName(product) as string}
                    rating={productGetters.getRating(product)}
                  />
                </SplideSlide>
              )
            })}
          </Splide>
        </Grid>
      )}
    </>
  )
}

export default ProductRecommendations
