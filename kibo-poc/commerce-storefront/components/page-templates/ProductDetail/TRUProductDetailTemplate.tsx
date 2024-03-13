/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */

import React, { useState, useEffect } from 'react'

import Col from '@core/Col'
import Container from '@core/Container'
import Row from '@core/Row'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import StarRounded from '@mui/icons-material/StarRounded'
import { LoadingButton } from '@mui/lab'
import { Typography, styled, Theme, Box, MenuItem } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import {
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  UncontrolledCollapse,
  Media,
} from 'reactstrap'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
} from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import {
  FulfillmentOptions,
  KiboRadio,
  KiboSelect,
  Price,
  QuantitySelector,
  SocialMediaShare,
} from '@/components/common'
import Tabs from '@/components/common/Tabs/Tabs'
import TabsMobile from '@/components/common/Tabs/TabsMobile'
import { KiboBreadcrumbs, ImageGallery } from '@/components/core'
import BreadCrumb from '@/components/core/Breadcrumbs/TRUBreadCrumb'
import { AddToCartDialog, StoreLocatorDialog } from '@/components/dialogs'
import {
  ColorSelector,
  ProductInformation,
  ProductOptionCheckbox,
  ProductOptionSelect,
  ProductOptionTextBox,
  ProductQuickViewDialog,
  ProductVariantSizeSelector,
} from '@/components/product'
import { useModalContext } from '@/context'
import {
  useProductDetailTemplate,
  useGetPurchaseLocation,
  useAddCartItem,
  useWishlist,
  useGetProductInventory,
  usePriceRangeFormatter,
  useGetProductPrice,
} from '@/hooks'
import { FulfillmentOptions as FulfillmentOptionsConstant, PurchaseTypes } from '@/lib/constants'
import { productGetters, subscriptionGetters, wishlistGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import type { ProductCustom, BreadCrumb as BreadCrumbType, LocationCustom } from '@/lib/types'

import type {
  AttributeDetail,
  ProductImage,
  ProductOption,
  ProductOptionValue,
  CrProduct,
  ProductPrice,
} from '@/lib/gql/types'

interface ProductDetailTemplateProps {
  product: ProductCustom
  breadcrumbs?: BreadCrumbType[]
  isQuickViewModal?: boolean
  children?: any
  isB2B?: boolean
  addItemToList?: string
  addItemToQuote?: string
  addItemToCart?: string
  title?: string
  cancel?: string
  quoteDetails?: any
  shouldFetchShippingMethods?: boolean
  getCurrentProduct?: (
    addToCartPayload: any,
    currentProduct: ProductCustom,
    isValidateAddToCart: boolean,
    isValidateAddToWishlist: boolean
  ) => void
}

const styles = {
  moreDetails: {
    typography: 'body2',
    textDecoration: 'underline',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'right',
    padding: '0.5rem 0',
    cursor: 'pointer',
    paddingLeft: '30rem',
  },
}

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  ...styles.moreDetails,
  color: theme?.palette.text.primary,
  fontSize: theme?.typography.body2.fontSize,
}))

const TRUProductDetailTemplate = (props: ProductDetailTemplateProps) => {
  const { getProductLink } = uiHelpers()
  const {
    product,
    breadcrumbs = [],
    isQuickViewModal = false,
    children,
    isB2B = false,
    addItemToList,
    addItemToQuote,
    addItemToCart,
    cancel,
    quoteDetails,
    shouldFetchShippingMethods,
    getCurrentProduct,
  } = props
  const { t } = useTranslation('common')

  const isDigitalFulfillment = product.fulfillmentTypesSupported?.some(
    (type) => type === FulfillmentOptionsConstant.DIGITAL
  )

  const [purchaseType, setPurchaseType] = useState<string>(PurchaseTypes.ONETIMEPURCHASE)
  const [selectedFrequency, setSelectedFrequency] = useState<string>('')
  const [isSubscriptionPricingSelected, setIsSubscriptionPricingSelected] = useState<boolean>(false)

  const isSubscriptionModeAvailable = subscriptionGetters.isSubscriptionModeAvailable(product)
  const { data: productPriceResponse } = useGetProductPrice(
    product?.productCode as string,
    isSubscriptionPricingSelected
  )

  const { showModal, closeModal } = useModalContext()
  const { addToCart } = useAddCartItem()
  const { data: purchaseLocation } = useGetPurchaseLocation()

  const { addOrRemoveWishlistItem, checkProductInWishlist, isWishlistLoading } = useWishlist()

  const {
    currentProduct,
    quantity,
    updatedShopperEnteredValues,
    selectedFulfillmentOption,
    setQuantity,
    selectProductOption,
    setSelectedFulfillmentOption,
  } = useProductDetailTemplate({
    product,
    purchaseLocation,
  })

  // Getters
  const {
    productName,
    productCode,
    variationProductCode,
    fulfillmentMethod,
    productPrice,
    productPriceRange,
    productRating,
    description,
    shortDescription,
    productGallery,
    productOptions,
    optionsVisibility,
    properties,
    isValidForOneTime,
  } = productGetters.getProductDetails(
    {
      ...currentProduct,
      fulfillmentMethod: isDigitalFulfillment
        ? FulfillmentOptionsConstant.DIGITAL
        : selectedFulfillmentOption?.method,
      purchaseLocationCode: selectedFulfillmentOption?.location?.code as string,
    },
    productPriceResponse?.price as ProductPrice
  )
  console.info('properties', properties[2])

  const { data: locationInventory } = useGetProductInventory(
    (variationProductCode || productCode) as string,
    selectedFulfillmentOption?.location?.code as string
  )

  const quantityLeft = productGetters.getAvailableItemCount(
    currentProduct,
    locationInventory,
    selectedFulfillmentOption?.method
  )
  const fulfillmentOptions = productGetters.getProductFulfillmentOptions(
    currentProduct,
    {
      name: selectedFulfillmentOption?.location?.name,
    },
    locationInventory
  )

  const isValidForAddToCart = () => {
    if (purchaseType === PurchaseTypes.SUBSCRIPTION) {
      return !!selectedFrequency && !(quantityLeft < 1)
    } else if (isDigitalFulfillment) {
      return isValidForOneTime
    }
    return isValidForOneTime && !(quantityLeft < 1)
  }

  const isProductInWishlist = checkProductInWishlist({
    productCode,
    variationProductCode,
  })

  const subscriptionFrequency = subscriptionGetters.getFrequencyValues(product as ProductCustom)

  const purchaseTypeRadioOptions = [
    {
      value: PurchaseTypes.SUBSCRIPTION,
      name: PurchaseTypes.SUBSCRIPTION,
      label: <Typography variant="body2">{PurchaseTypes.SUBSCRIPTION}</Typography>,
    },
    {
      value: PurchaseTypes.ONETIMEPURCHASE,
      name: PurchaseTypes.ONETIMEPURCHASE,
      label: <Typography variant="body2">{PurchaseTypes.ONETIMEPURCHASE}</Typography>,
    },
  ]

  const addToCartPayload = {
    product: {
      productCode,
      variationProductCode,
      fulfillmentMethod,
      options: updatedShopperEnteredValues,
      purchaseLocationCode: selectedFulfillmentOption?.location?.code as string,
      currentProduct,
    },
    quantity,
    ...(purchaseType === PurchaseTypes.SUBSCRIPTION && {
      subscription: {
        required: true,
        frequency: subscriptionGetters.getFrequencyUnitAndValue(selectedFrequency),
      },
    }),
  }

  // methods
  const handleAddToCart = async () => {
    try {
      const cartResponse = await addToCart.mutateAsync(addToCartPayload)

      if (cartResponse.id && !isB2B) {
        showModal({
          Component: AddToCartDialog,
          props: {
            cartItem: cartResponse,
          },
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFulfillmentOptionChange = (value: string) => {
    if (
      value === FulfillmentOptionsConstant.SHIP ||
      selectedFulfillmentOption?.location?.name ||
      purchaseLocation.code
    ) {
      setSelectedFulfillmentOption({
        ...selectedFulfillmentOption,
        method: value,
      })
    } else {
      handleProductPickupLocation()
    }
  }

  const handleProductPickupLocation = (title?: string) => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        title: title,
        showProductAndInventory: true,
        product: currentProduct as CrProduct,
        quantity: quantity,
        isQuickViewModal: isQuickViewModal,
        isNested: isQuickViewModal,
        NestedDialog: isQuickViewModal ? ProductQuickViewDialog : null,
        nestedDialogProps: {
          product: currentProduct,
          shouldFetchShippingMethods,
          isQuickViewModal: true,
          dialogProps: {
            title: props.title,
            cancel,
            addItemToList: addItemToList,
            addItemToQuote: addItemToQuote,
            addItemToCart,
            isB2B,
          },
          quoteDetails,
        },
        onNestedDialogClose: {
          Component: ProductQuickViewDialog,
          props: {
            product: currentProduct,
            isQuickViewModal: true,
            shouldFetchShippingMethods,
            dialogProps: {
              title: props.title,
              cancel,
              addItemToList: addItemToList,
              addItemToQuote: addItemToQuote,
              addItemToCart,
              isB2B,
            },
            quoteDetails,
          },
        },
        handleSetStore: async (selectedStore: LocationCustom) => {
          setSelectedFulfillmentOption({
            method: FulfillmentOptionsConstant.PICKUP,
            location: selectedStore,
          })
        },
      },
    })
  }

  const isValidForAddToWishlist = wishlistGetters.isAvailableToAddToWishlist(currentProduct)

  const handleWishList = async () => {
    try {
      if (!isValidForAddToWishlist) return
      await addOrRemoveWishlistItem({ product: currentProduct })
    } catch (error) {
      console.log('Error: add or remove wishlist item from PDP', error)
    }
  }

  const handlePurchaseTypeSelection = (option: string) => {
    setPurchaseType(option)
    if (option === PurchaseTypes.SUBSCRIPTION) {
      setIsSubscriptionPricingSelected(true)
      setSelectedFulfillmentOption({
        ...selectedFulfillmentOption,
        method: FulfillmentOptionsConstant.SHIP,
      })
    } else {
      setIsSubscriptionPricingSelected(false)
    }
  }

  const handleFrequencyChange = async (_name: string, value: string) => setSelectedFrequency(value)

  useEffect(() => {
    if (isB2B && (isValidForAddToCart() || isValidForAddToWishlist)) {
      getCurrentProduct?.(
        addToCartPayload,
        currentProduct,
        isValidForAddToCart(),
        isValidForAddToWishlist as boolean
      )
    }
  }, [isB2B, isValidForAddToCart(), isValidForAddToWishlist, JSON.stringify(addToCartPayload)])

  const [modal, setModal] = useState(false)
  const ModalBasket = () => setModal(!modal)
  const giftModal = () => setModal(!modal)

  const [modalProduct, setModalProduct] = useState(false)

  return (
    <main className="pdp-outer">
      {/* <FeedBack /> */}
      <div className="breadcrumb-outer">
        <Container>
          <BreadCrumb breadcrumbs={breadcrumbs} />
          {/* <KiboBreadcrumbs breadcrumbs={breadcrumbs} /> */}
        </Container>
      </div>
      <div className="product-view-section">
        <Container>
          <Row>
            <Col xs="12" md="7" lg="8" xl="9">
              {/* <SliderPDP /> */}
              {/* <div className="product-sharing d-lg-none"> */}
              <ImageGallery images={productGallery as ProductImage[]} title={''} />
              {/* </div> */}
            </Col>
            <Col xs="12" md="5" lg="4" xl="3">
              <div className="pdp-content-outer">
                <div className="product-badge">
                  <div className="badge-message badge-normal">
                    <span>Clearance</span>
                  </div>
                  <div className="badge-message badge-new">
                    <span>New in</span>
                  </div>
                </div>
                <h1 className="product-title">{productName}</h1>
                <div className="product-brand">
                  <span>Brand: </span>
                  <a href="#" className="btn-link">
                    Hasbro
                  </a>
                </div>
                <div className="pricing-card">
                  <CardSubtitle>
                    <span>{t('currency', { val: productPrice?.regular })}</span>
                  </CardSubtitle>
                  <CardText className="offer-price">
                    {t('currency', { val: productPrice?.regular })}
                  </CardText>
                  <div className="offer-note">
                    This item is on{' '}
                    <a className="btn-link" href="#">
                      special offer
                    </a>{' '}
                    right now.
                  </div>
                  <div className="price-text">
                    <CardText>{t('currency', { val: productPrice?.special })}</CardText>
                  </div>
                </div>
                <Box paddingY={1}>
                  <QuantitySelector
                    label="Qty"
                    quantity={quantity}
                    onIncrease={() =>
                      setQuantity((prevQuantity: number) => Number(prevQuantity) + 1)
                    }
                    onDecrease={() =>
                      setQuantity((prevQuantity: number) => Number(prevQuantity) - 1)
                    }
                  />
                </Box>
                {isSubscriptionModeAvailable && (
                  <Box paddingY={1}>
                    <KiboRadio
                      radioOptions={purchaseTypeRadioOptions}
                      selected={purchaseType}
                      onChange={handlePurchaseTypeSelection}
                    />
                  </Box>
                )}
                <Box paddingY={1}>
                  {purchaseType === PurchaseTypes.SUBSCRIPTION && (
                    <KiboSelect
                      name={t('subscription-frequency')}
                      onChange={handleFrequencyChange}
                      placeholder={t('select-subscription-frequency')}
                      value={selectedFrequency}
                      label={t('subscription-frequency')}
                    >
                      {subscriptionFrequency?.map((property) => {
                        return (
                          <MenuItem key={property?.stringValue} value={`${property?.stringValue}`}>
                            {`${property?.stringValue}`}
                          </MenuItem>
                        )
                      })}
                    </KiboSelect>
                  )}
                </Box>
                <div className="product-actions">
                  <div className="product-option-message d-none">
                    <div className="option-check">
                      <label className="checkbox light-green">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        <span className="checklabel option-installation">
                          Add professional assembly
                        </span>
                        <span className="checkcount">Free</span>
                      </label>
                    </div>
                    <div className="option-radio">
                      <label className="radio light-green">
                        <input type="radio" />
                        <span className="checkmark"></span>
                        <span className="checklabel">Add professional assembly</span>
                        <span className="checkcount">Free</span>
                      </label>
                    </div>
                    <div className="option-radio">
                      <label className="radio light-green">
                        <input type="radio" />
                        <span className="checkmark"></span>
                        <span className="checklabel">Add professional assembly</span>
                        <span className="checkcount">Free</span>
                      </label>
                    </div>
                    <a href="#" className="option-link">
                      More about our assembly service | toys “r” us
                    </a>
                  </div>
                  <div className="product-option-message">
                    <div className="option-check">
                      <label className="checkbox light-green">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        <span className="checklabel option-warranty">Add Warranty</span>
                        <span className="checkcount">10 AED</span>
                      </label>
                    </div>
                    <a href="#" className="option-link">
                      {"More about Product Warranty | Toys 'R' Us QAT"}
                    </a>
                  </div>
                  <div className="dropdown-custom">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle caret color="light">
                        <span>1</span>
                      </DropdownToggle>
                      <DropdownMenu left>
                        <DropdownItem>2</DropdownItem>
                        <DropdownItem>3</DropdownItem>
                        <DropdownItem>4</DropdownItem>
                        <DropdownItem>5</DropdownItem>
                        <DropdownItem>6</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                  <Button color="success" onClick={() => handleAddToCart()}>
                    Add to basket
                  </Button>
                  <Button color="light" className="btn-wishlist"></Button>
                  <div className="product-action-message">
                    Only 999 items could be added in the basket
                  </div>
                </div>
                <div className="product-attributes">
                  <div className="gift-suit">
                    <div className="icon-card svg-gift">
                      <div className="icon-card-content">
                        <span>Free gift wrapping service</span>
                        <div className="ic-btns">
                          <span className="btn-link bold" onClick={giftModal}>
                            <strong>More about</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-suit svg-girl">
                    <span>Suitable for age 3 years+</span>
                  </div>
                  <div className="product-status">
                    <div className="icon-card svg-collect">
                      <div className="icon-card-content">
                        <span>Click & Collect available</span>
                        <div className="ic-btns">
                          <Link href="#">
                            <span className="btn-link bold">See stores</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="icon-card svg-delivery">
                      <div className="icon-card-content">
                        <span>Home delivery available</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-tags">
                  <h5>Recommended for‎</h5>
                  <ul className="tag-list">
                    <li>
                      <span>Independent Play</span>
                    </li>
                    <li>
                      <span>Creative Play</span>
                    </li>
                    <li>
                      <span>Role Play</span>
                    </li>
                  </ul>
                </div>
                <div className="product-sharing d-none d-lg-flex">
                  <label>Share</label>
                  <SocialMediaShare product={undefined} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="product-data-section">
        <Container>
          <div className="pdp-tabs">
            <Tabs />
          </div>
          <div className="pdp-tabs-mobile">
            <TabsMobile />
          </div>
        </Container>
      </div>
      <div className="product-recommendations">
        <Container>
          <h2 className="title-main">Customers Also Bought</h2>
          {/* <RelatedProducts /> */}
        </Container>
      </div>
      <div className="pdp-sticky-bar fixed-bottom">
        <Container>
          <div className="sticky-bar-content">
            <div className="sticky-title">{productName}</div>
            <div className="sticky-buttons">
              <div className="pricing-card">
                <CardSubtitle>
                  <span>{t('currency', { val: productPrice?.regular })}</span>
                </CardSubtitle>
                <CardText className="offer-price">
                {t('currency', { val: productPrice?.special })}
                </CardText>
              </div>
              <div className="product-actions">
                <div className="dropdown-custom">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle caret color="light">
                      <span>1</span>
                    </DropdownToggle>
                    <DropdownMenu left>
                      <DropdownItem>2</DropdownItem>
                      <DropdownItem>3</DropdownItem>
                      <DropdownItem>4</DropdownItem>
                      <DropdownItem>5</DropdownItem>
                      <DropdownItem>6</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <Button color="success" onClick={() => handleAddToCart()}>
                  Add to basket
                </Button>
                <Button color="light" className="btn-wishlist"></Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Gift modal */}
      {/* <Modal isOpen={modal} toggle={giftModal} className="modal-custom" size="md" centered>
        <ModalHeader toggle={giftModal}>Add gift wrapping</ModalHeader>
        <ModalBody className="scrollbar">
          <Row>
            <Col xs="12" sm="6">
              <Card className="gift-wrap-card">
                <figure><i className="icon-card icon-lg svg-gift"></i><span>FREE</span></figure>
                <h6 className="gift-wrap-text">Have this item gift wrapped by us. Valid for home delivery & Click & collect orders</h6>
              </Card>
              <Card className="gift-wrap-card">
                <figure><i className="icon-card icon-lg svg-tag"></i><span>FREE</span></figure>
                <h6 className="gift-wrap-text">Add a personalised message to your gift</h6>
              </Card>
            </Col>
            <Col xs="12" sm="6"><img src="/images/tru/temp/product08.jpg" className="img-fluid my-3 my-sm-0" alt /></Col>
          </Row>
          <p className="my-3 font-weight-bold text-center">Simply add your item & choose gift wrapping in your basket</p>
        </ModalBody>
      </Modal> */}
    </main>
  )
}

export default TRUProductDetailTemplate
