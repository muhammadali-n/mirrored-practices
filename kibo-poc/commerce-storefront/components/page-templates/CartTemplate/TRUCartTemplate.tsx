/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import { LoadingButton } from '@mui/lab'
import {
  useTheme,
  useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {
  Alert,
  Card,
  CardBody,
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Button,
  UncontrolledButtonDropdown,
} from 'reactstrap'

import { CartItemList } from '@/components/cart'
import { PromoCodeBadge, OrderSummary, ResponsiveWrapper } from '@/components/common'
import { ConfirmationDialog, StoreLocatorDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import {
  useGetCart,
  useInitiateOrder,
  useGetStoreLocations,
  useGetPurchaseLocation,
  useUpdateCartItemQuantity,
  useDeleteCartItem,
  useUpdateCartCoupon,
  useDeleteCartCoupon,
  useInitiateCheckout,
  useCartActions,
  useProductCardActions,
} from '@/hooks'
import { orderGetters, cartGetters, productGetters } from '@/lib/getters'

import type { CrCart, Location, CrCartItem, Maybe, CrOrderItem, CrProduct } from '@/lib/gql/types'

export interface CartTemplateProps {
  isMultiShipEnabled: boolean
  cart: CrCart
}

const TRUCartTemplate = (props: CartTemplateProps) => {
  const { isMultiShipEnabled } = props
  const { data: cart } = useGetCart(props?.cart)

  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobileViewport = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const { initiateOrder } = useInitiateOrder()
  const { initiateCheckout } = useInitiateCheckout()
  const { updateCartItemQuantity } = useUpdateCartItemQuantity()
  const { deleteCartItem } = useDeleteCartItem()
  const { showModal, closeModal } = useModalContext()

  const cartItemCount = cartGetters.getCartItemCount(cart)
  const cartItems = cartGetters.getCartItems(cart)

  const locationCodes = orderGetters.getFulfillmentLocationCodes(cartItems as CrCartItem[])

  const { data: locations } = useGetStoreLocations({ filter: locationCodes })
  const { data: purchaseLocation } = useGetPurchaseLocation()
  const { updateCartCoupon } = useUpdateCartCoupon()
  const { deleteCartCoupon } = useDeleteCartCoupon()
  const [promoError, setPromoError] = useState<string>('')
  const [showLoadingButton, setShowLoadingButton] = useState<boolean>(false)
  const { handleDeleteCurrentCart } = useProductCardActions()

  const handleApplyPromoCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateCartCoupon.mutateAsync({
        cartId: cart?.id as string,
        couponCode,
      })
      if (response?.invalidCoupons?.length) {
        setPromoError(`<strong>${couponCode}</strong> ${response?.invalidCoupons[0]?.reason}`)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleRemovePromoCode = async (couponCode: string) => {
    try {
      await deleteCartCoupon.mutateAsync({
        cartId: cart?.id as string,
        couponCode,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteItem = async (cartItemId: string) => {
    await deleteCartItem.mutateAsync({ cartItemId })
  }

  const handleItemActions = () => {
    // your code here
  }

  const handleGotoCheckout = async () => {
    setShowLoadingButton(true)
    try {
      const initiateOrderResponse = isMultiShipEnabled
        ? await initiateCheckout.mutateAsync(cart?.id)
        : await initiateOrder.mutateAsync({ cartId: cart?.id as string })

      if (initiateOrderResponse?.id) {
        router.push(`/checkout/${initiateOrderResponse.id}`)
      }
    } catch (err) {
      console.error(err)
      setShowLoadingButton(false)
    }
  }

  const orderSummaryArgs = {
    nameLabel: t('cart-summary'),
    subTotalLabel: `${t('subtotal')} (${t('item-quantity', { count: cartItemCount })})`,
    totalLabel: t('estimated-order-total'),
    orderDetails: cart,
    isShippingTaxIncluded: false,
    promoComponent: (
      <PromoCodeBadge
        onApplyCouponCode={handleApplyPromoCode}
        onRemoveCouponCode={handleRemovePromoCode}
        promoList={cart?.couponCodes as string[]}
        promoError={!!promoError}
        helpText={promoError}
      />
    ),
  }

  const handleContinueShopping = () => {
    router.back()
  }

  const { onFulfillmentOptionChange, handleQuantityUpdate, handleProductPickupLocation } =
    useCartActions({
      cartItems: cartItems as CrCartItem[],
      purchaseLocation,
    })

  const openClearCartConfirmation = () => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        onConfirm: handleDeleteCurrentCart,
        contentText: t('clear-cart-confirmation-text'),
        primaryButtonText: t('delete'),
      },
    })
  }

  const [isOpen, setIsOpen] = useState(false)
  const toggleCode = () => setIsOpen(!isOpen)

  const [modal, setModal] = useState(false)
  const warrantyModal = () => setModal(!modal)
  const giftModal = () => setModal(!modal)

  return (
    <>
      <div className="cart-layout-outer">
        <Container>
          <Row>
            <Col>
              <h1 className="cart-title">
                Basket&nbsp;<span>({cartItemCount})</span>
              </h1>
            </Col>
          </Row>

          <Row>
            <Col xs="12" lg="8">
              {/* Alers Message */}
              {/* <Alert color="dark" className="justify-content-between">
                <span>
                  Someone snagged the last of some of your items. Remove or save them to your
                  wishlist to continue
                </span>
                <Button size="sm" color="secondary">
                  Show me
                </Button>
              </Alert>
              <Alert color="warning">
                {
                  "This order is only available for Home delivery as some items aren't eligible for Click & Collect"
                }
              </Alert> */}
              {/* Alers Message */}

              <div className="cart-products-outer">
                {/* <div className="delivery-note">
                  <img
                    src="/images/tru/PRODUCTDES-7780-AUH-delivery-delay-EN-D.png"
                    className="d-none d-lg-block img-fluid"
                    alt=""
                  />
                  <img
                    src="/images/tru/PRODUCTDES-7780-AUH-delivery-delay-EN-M.jpg"
                    alt=""
                    className="d-lg-none img-fluid"
                  />
                </div> */}
                {/* Bag Products */}
                {cartItems?.map((item: Maybe<CrCartItem> | Maybe<CrOrderItem>, index) => (
                <Card key={`key_${index+1}`}>
                  {/* <div className="cart-outofstock">Out of stock‎</div> */}
                  <CardBody>
                    <button className="btn-close"></button>
                    <Row>
                      <Col className="product-image">
                        <div className="item-image">
                          <img src={(item?.product?.imageUrl ?? "")} alt="" />
                        </div>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <Link href={`/${item?.product?.productCode}`}>{item?.product?.name}</Link>
                            <div className="item-price offer-price">
                              <p className="discounted-price">
                                <span>{t('currency', { val: item?.product?.price?.price})}</span>
                              </p>
                              <span className="price">{t('currency', { val: item?.product?.price?.salePrice})}</span>
                              {/* <span className="price-each">AED each</span> */}
                            </div>
                            <ResponsiveWrapper xs><Button color="link">Move to wishlist</Button></ResponsiveWrapper>
                          </Col>
                        </Row>
                        <Row>
                          <ResponsiveWrapper xl lg md>
                            <Col xs="12">
                              <div className="item-data">
                                <div className="data-left">
                                  <div className="dropdown-custom">
                                    <UncontrolledButtonDropdown>
                                      <DropdownToggle caret color="light" disabled>
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
                                  <Button color="link">Move to wishlist</Button>
                                </div>
                                <div className="total-price">832 AED</div>
                              </div>
                              <div className="item-total">
                                <h5>Item total</h5>
                                <h6>2499 AED</h6>
                              </div>
                              <div className="product-attributes">
                                <div className="product-status">
                                  <div className="icon-card svg-delivery">
                                    <div className="icon-card-content">
                                      <span>Home delivery within 1 - 3 business days</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </ResponsiveWrapper>

                          <ResponsiveWrapper xs>
                            <Col xs="12">
                              <div className="item-data">
                                <div className="data-left">
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
                                </div>
                                <div className="total-price">832 AED</div>
                              </div>
                            </Col>
                          </ResponsiveWrapper>
                        </Row>
                      </Col>
                    </Row>

                    <ResponsiveWrapper sm>
                      <Row>
                        <Col xs="12">
                          <div className="item-data">
                            <div className="data-left">
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
                              <Button color="link">Move to wishlist</Button>
                            </div>
                            <div className="total-price">832 AED</div>
                          </div>
                        </Col>
                      </Row>
                    </ResponsiveWrapper>

                    <ResponsiveWrapper xs sm>
                      <Row>
                        <Col xs="12">
                          <div className="item-assembly">
                            <div className="icon-card svg-installation">
                              <div className="icon-card-content">
                                <span>Professional assembly added</span>
                                <a href="#" className="btn-link">Remove</a>
                              </div>
                            </div>
                            <h6>Free</h6>
                          </div>
                          <div className="item-total">
                            <h5>Item total</h5>
                            <h6>2499 AED</h6>
                          </div>
                          <div className="product-attributes">
                            <div className="product-status">
                              <div className="icon-card svg-collect">
                                <div className="icon-card-content">
                                  <span>Click & Collect available</span>
                                  <a href="#" className="btn-link">See stores</a>
                                </div>
                              </div>
                              <div className="icon-card svg-delivery">
                                <div className="icon-card-content">
                                  <span>Home delivery within 1 - 3 business days</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </ResponsiveWrapper>
                  </CardBody>
                </Card>
                ))}
                {/* / Bag Products */}
              </div>
            </Col>

            <Col xs="12" lg="4">
              {/* Order summary */}
              <div className="order-summary-outer sticky-top">
                <Card>
                  <CardBody>
                    <h4 className="order-summary-title">Order summary</h4>
                    <div className="promo-code-outer">
                      <div className="promo-code" onClick={toggleCode}>
                        <p>Use a discount code</p>
                        <i className={`${isOpen ? 'icon-chev-up' : 'icon-chev-down'}`} />
                      </div>
                      <Collapse isOpen={isOpen}>
                        <div className="form-sm">
                          <Input type="email" name="email" className="form-sm-input" />
                          <button className="form-sm-btn">Submit</button>
                        </div>
                        <Row className="mt-3">
                          <Col>
                            <p className="text-danger">
                              Code XXXX didn’t work. Do you have another code?
                            </p>
                            <p className="text-primary">Code “12345” applied</p>
                          </Col>
                        </Row>
                      </Collapse>
                    </div>

                    <div className="price-summary-outer">
                      <Row className="justify-content-between">
                        <Col xs="auto">Subtotal</Col>
                        <Col xs="auto">{t('currency', {
                      val: cart?.subtotal})}</Col>
                      </Row>
                      <Row className="justify-content-between">
                        <Col xs="auto">Delivery cost</Col>
                        <Col xs="auto">Free</Col>
                      </Row>
                      <Row className="justify-content-between">
                        <Col xs="auto">Discounts applied</Col>
                        <Col xs="auto">{t('currency', {
                      val: (cart?.discountedSubtotal ?? 0) - (cart?.total ?? 0)})}</Col>
                      </Row>

                      <hr className="my-3" />

                      <Row className="justify-content-between order-total">
                        <Col xs="auto">Order total</Col>
                        <Col xs="auto">{t('currency', {
                      val: cart?.discountedSubtotal})}</Col>
                      </Row>
                      <Row className="justify-content-between order-total-sub">
                        <Col xs="auto">Includes 5% VAT</Col>
                        <Col xs="auto">120.86 AED</Col>
                      </Row>

                      <hr className="my-3" />

                      <Row>
                        <Col className="text-center font-size-sm">Home delivery only from Free</Col>
                      </Row>
                    </div>

                    <div className="cart-buttons">
                      <Row>
                        <Col>
                          <Button color="success" onClick={handleGotoCheckout}>
                            <i className="icon-lock mr-auto" />
                            Check out now
                          </Button>
                          <Button color="light" block className="animated mt-2">
                            Continue shopping
                          </Button>
                        </Col>
                      </Row>
                    </div>

                    <div className="security-message">
                      <i className="icon-lock primary"></i>Our website is 100% encrypted and your
                      personal details are safe
                    </div>
                  </CardBody>
                </Card>
              </div>
              {/* / Order summary */}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="cart-empty-outer d-none">
        <div className="cart-empty-banner">
          <span className="cart-empty-bg1 i-shape-cloud"></span>
          <span className="cart-empty-bg2 i-shape-cloud"></span>
          <div className="cart-empty-content">
            <div className="cart-empty-text">
              <h3 className="cart-empty-title">
                Your basket is <br /> empty
              </h3>
              <Button color="light">
                <span>Start shopping now</span>
              </Button>
            </div>
            <img src="/images/tru/empty_basket_chase.png" className="cart-empty-img1" alt="" />
            <img src="/images/tru/empty_basket_lego_man.png" className="cart-empty-img2" alt="" />
          </div>
        </div>
      </div>

      {/* Warranty modal */}
      <Modal isOpen={modal} toggle={warrantyModal} className="modal-custom" size="md" centered>
        <ModalHeader toggle={warrantyModal}>Add warranty</ModalHeader>
        <ModalBody className="scrollbar">
          <div className="warranty-select">
            <ul className="filter-item-select">
              <li>
                <label className="radio light-green">
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span>
                  <span className="checklabel">‎1YEAR EXTENDED WARRANTY</span>
                  <span className="checkcount">20 AED</span>
                </label>
              </li>
              <li>
                <label className="radio light-green selected">
                  <input type="radio" name="radio" checked />
                  <span className="checkmark"></span>
                  <span className="checklabel">‎2YEARS EXTENDED WARRANTY</span>
                  <span className="checkcount">20 AED</span>
                </label>
              </li>
              <li>
                <label className="radio light-green">
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span>
                  <span className="checklabel">‎3YEARS EXTENDED WARRANTY</span>
                  <span className="checkcount">50 AED</span>
                </label>
              </li>
              <li>
                <label className="radio light-green">
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span>
                  <span className="checklabel">‎4YEARS EXTENDED WARRANTY</span>
                  <span className="checkcount">100 AED</span>
                </label>
              </li>
            </ul>

            <div className="warranty-content">
              <h5 className="warranty-subtitle">All warranties include:</h5>
              <ul className="list-dots">
                <li>Highlight 1</li>
                <li>Highlight 2</li>
                <li>Highlight 3</li>
              </ul>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="white" onClick={warrantyModal}>
            Cancel
          </Button>
          <Button color="success">Confirm</Button>
        </ModalFooter>
      </Modal>

      {/* Gift modal */}
      <Modal isOpen={modal} toggle={giftModal} className="modal-custom" size="md" centered>
        <ModalHeader toggle={giftModal}>Add gift wrapping</ModalHeader>
        <ModalBody className="scrollbar">
          <Row>
            <Col xs="12" sm="6">
              <Card className="gift-wrap-card">
                <figure>
                  <i className="icon-card icon-lg svg-gift"></i>
                  <span>FREE</span>
                </figure>
                <h6 className="gift-wrap-text">
                  Have this item gift wrapped by us. Valid for home delivery & Click & collect
                  orders
                </h6>
              </Card>
              <Card className="gift-wrap-card">
                <figure>
                  <i className="icon-card icon-lg svg-tag"></i>
                  <span>FREE</span>
                </figure>
                <h6 className="gift-wrap-text">Add a personalised message to your gift</h6>
              </Card>
            </Col>
            <Col xs="12" sm="6">
              <img src="/images/tru/temp/product08.jpg" className="img-fluid my-3 my-sm-0" alt="" />
            </Col>
          </Row>
          <p className="my-3 font-weight-bold text-center">
            Simply add your item & choose gift wrapping in your basket
          </p>
          <div className="modal-block-sm">
            <ul className="filter-item-select">
              <li>
                <label className="radio light-green">
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span>
                  <span className="checklabel">Gift wrap only</span>
                  <span className="checkcount">Free</span>
                </label>
              </li>
              <li>
                <label className="radio light-green selected">
                  <input type="radio" name="radio" checked />
                  <span className="checkmark"></span>
                  <span className="checklabel">‎Gift wrap with personal message</span>
                  <span className="checkcount">Free</span>
                </label>
              </li>
            </ul>
            <FormGroup className="mt-3">
              <div className="input-item">
                <Input type="textarea" rows="4" name="note" />
                <div className="validation-mark"></div>
              </div>
              <div className="color-gray-500 mt-2">256 characters left</div>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="white" onClick={giftModal}>
            Cancel
          </Button>
          <Button color="success">Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default TRUCartTemplate
