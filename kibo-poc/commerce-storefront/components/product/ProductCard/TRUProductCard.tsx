import React, { MouseEvent } from 'react'

import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRounded from '@mui/icons-material/FavoriteRounded'
import StarRounded from '@mui/icons-material/StarRounded'
import { LoadingButton } from '@mui/lab'
import { Typography, CardMedia, Box, Stack, Skeleton, Button, Rating } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'

import { ProductCardStyles } from './ProductCard.styles'
import { KiboImage, Price } from '@/components/common'
import { usePriceRangeFormatter } from '@/hooks'
import { FulfillmentOptions as FulfillmentOptionsConstant } from '@/lib/constants'
import DefaultImage from '@/public/product_placeholder.svg'

import type { CrProductOption, Product, ProductPriceRange } from '@/lib/gql/types'
export interface ProductCardProps {
  title?: string
  link: string
  imageUrl?: string
  placeholderImageUrl?: string
  imageAltText?: string
  price?: string
  salePrice?: string
  priceRange?: ProductPriceRange
  productCode?: string
  variationProductCode?: string
  rating?: number
  imageHeight?: number
  imageLayout?: string
  isInWishlist?: boolean
  isInCart?: boolean
  isLoading?: boolean
  isShowWishlistIcon?: boolean
  product?: Product
  showQuickViewButton?: boolean
  badge?: string
  isATCLoading?: boolean
  options?: CrProductOption[]
  fulfillmentTypesSupported?: string[]
  onAddOrRemoveWishlistItem?: () => void
  onClickQuickViewModal?: () => void
  onClickAddToCart?: (payload: any) => void
}
const ProductCardSkeleton = () => {
  return (
    <Stack spacing={1} sx={ProductCardStyles.cardRoot} data-testid="product-card-skeleton">
      <Skeleton variant="rectangular" height={150} />
      <Skeleton variant="rectangular" height={20} />
      <Skeleton variant="rectangular" width={60} height={20} />
      <Skeleton variant="rectangular" width={95} height={20} />
    </Stack>
  )
}
const TRUProductCard = (props: ProductCardProps) => {
  const {
    productCode,
    variationProductCode,
    price,
    salePrice,
    priceRange,
    title,
    link,
    imageUrl,
    placeholderImageUrl = DefaultImage,
    rating = 0,
    imageHeight = 180,
    imageAltText = 'product-image-alt',
    isLoading = false,
    isInWishlist = false,
    isShowWishlistIcon = true,
    badge,
    onAddOrRemoveWishlistItem,
    showQuickViewButton = true,
    isATCLoading,
    options,
    fulfillmentTypesSupported,
    onClickQuickViewModal,
    onClickAddToCart,
  } = props
  const productPriceRange = usePriceRangeFormatter(priceRange as ProductPriceRange)
  const { t } = useTranslation('common')
  const handleAddOrRemoveWishlistItem = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onAddOrRemoveWishlistItem?.()
  }
  const handleOpenProductQuickViewModal = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onClickQuickViewModal?.()
  }
  const handleAddToCart = (event: any) => {
    event.preventDefault()
    const payload = {
      product: {
        productCode: productCode,
        variationProductCode: variationProductCode,
        fulfillmentMethod: fulfillmentTypesSupported?.includes(FulfillmentOptionsConstant.DIGITAL)
          ? FulfillmentOptionsConstant.DIGITAL
          : FulfillmentOptionsConstant.SHIP,
        purchaseLocationCode: '',
        options: options,
      },
      quantity: 1,
    }
    onClickAddToCart?.(payload)
  }
  if (isLoading) return <ProductCardSkeleton />
  else
    return (
      <Card
        className={`${1 > 0 ? '' : 'item-outofstock'}`}
      >
        <Link href={link} passHref data-testid="product-card-link">
          <div className="card-outer">
            <figure>
              <CardImg width="100%" src={imageUrl} alt="" />
              <div className="badge bg1 d-none">
                <span>Free Shipping & Installation</span>
              </div>
              <div className="badge bg2 d-none">
                <span>New In</span>
              </div>
              {/* <div className={`badge ${product?.inventoryInfo?.onlineStockAvailable > 0 ? 'd-none' : 'out-of-stock'}`}><span>Out of stock‎</span></div> */}
            </figure>
            <CardBody>
              <CardTitle>{title}</CardTitle>
              <div className="pricing-card">
                <CardSubtitle>
                  <span>{priceRange?.lower?.salePrice || price} AED</span>
                </CardSubtitle>
                <CardText className="offer-price">
                  {priceRange?.upper?.salePrice || salePrice}
                  <span>AED</span>
                </CardText>
              </div>
            </CardBody>
          </div>
        </Link>
      </Card>
    )
}
export default TRUProductCard
