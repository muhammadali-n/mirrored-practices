/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/order */

import { useState } from 'react'

import Col from '@core/Col'
import Container from '@core/Container'
import Row from '@core/Row'
// import BreadCrumb from "@components/Breadcrumb/BreadCrumb";
// import FeedBack from "@components/Modal/FeedBack";
// import Banner from "@components/Banner";
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import { UncontrolledCollapse } from 'reactstrap'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import TRUProductCard from '@/components/product/ProductCard/TRUProductCard'
import { ProductCardListViewProps } from '@/components/product/ProductCardListView/ProductCardListView'
import { CategoryFacetData } from '@/components/product-listing/CategoryFacet/CategoryFacet'
import { useProductCardActions, useUpdateRoutes } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import type {
  BreadCrumb as BreadCrumbType,
  CategorySearchParams,
  ProductCustom,
  ProductProperties,
} from '@/lib/types'

import type { Facet as FacetType, FacetValue, Product } from '@/lib/gql/types'
import { Box } from '@mui/material'
import { KiboPagination } from '@/components/common'

interface SortingValues {
  value: string
  id: string
  selected: boolean
}

export interface ProductListingTemplateProps {
  breadCrumbsList: BreadCrumbType[]
  productListingHeader?: string
  facetList?: FacetType[]
  products?: Product[]
  sortingValues?: { options: SortingValues[]; selected: string }
  categoryFacet: CategoryFacetData
  totalResults: number
  isLoading?: boolean
  appliedFilters: FacetValue[]
  pageSize: number
  pageCount: number
  startIndex: number
  showQuickViewButton?: boolean
  isQuickViewModal?: boolean
  onSortItemSelection: (value: string) => void
  onPaginationChange?: (params?: CategorySearchParams) => void
  onInfiniteScroll?: () => void
}

const TRUProductListingTemplate = (props: ProductListingTemplateProps) => {
  const {
    breadCrumbsList,
    productListingHeader,
    facetList,
    products,
    sortingValues,
    categoryFacet,
    totalResults,
    isLoading,
    appliedFilters,
    pageSize,
    pageCount,
    startIndex,
    onSortItemSelection,
    onPaginationChange,
    onInfiniteScroll,
    showQuickViewButton = true,
  } = props
  const { publicRuntimeConfig } = getConfig()
  const productsPerPageArray = publicRuntimeConfig.productListing.pageSize
  const productPerPage = pageSize || productsPerPageArray[0]
  const handleProductPerPage = (size: number) =>
    onPaginationChange?.({
      pageSize: Number(size),
    })

  const { getProductLink } = uiHelpers()
  const { updateRoute } = useUpdateRoutes()
  // const { addToCart } = useAddCartItem()

  const {
    checkProductInWishlist,
    handleAddToCart,
    handleWishList,
    isATCLoading,
    openProductQuickViewModal,
  } = useProductCardActions()

  const [showFilterBy, setFilterBy] = useState<boolean>(false)
  const [isListView, setIsListView] = useState<boolean>(false)

  const { t } = useTranslation('common')
  // const { showModal } = useModalContext()

  const handleFilterBy = () => setFilterBy(!showFilterBy)

  const showCategoryFacet =
    categoryFacet.header ||
    (categoryFacet?.childrenCategories && categoryFacet?.childrenCategories?.length > 0)

  const handleClearAllFilters = () => {
    updateRoute('')
  }

  const handleSelectedTileRemoval = (selectedTile: string) => {
    updateRoute(selectedTile)
  }

  const productCardProps = (product: Product): ProductCardListViewProps => {
    const properties = productGetters.getProperties(product) as ProductProperties[]
    const productCode = productGetters.getProductId(product)
    const variationProductCode = productGetters.getVariationProductCode(product)
    return {
      productCode,
      variationProductCode,
      productDescription: productGetters.getShortDescription(product),
      showQuickViewButton: showQuickViewButton,
      badge: productGetters.getBadgeAttribute(properties),
      imageUrl:
        productGetters.getCoverImage(product) &&
        productGetters.handleProtocolRelativeUrl(productGetters.getCoverImage(product)),
      link: getProductLink(productCode, product?.content?.seoFriendlyUrl as string),
      price: t<string>('currency', {
        val: productGetters.getPrice(product).regular,
      }),
      ...(productGetters.getPrice(product).special && {
        salePrice: t<string>('currency', {
          val: productGetters.getPrice(product).special,
        }),
      }),
      priceRange: productGetters.getPriceRange(product),
      title: productGetters.getName(product),
      rating: productGetters.getRating(product),
      isInWishlist: checkProductInWishlist({
        productCode,
        variationProductCode,
      }),
      isShowWishlistIcon: !productGetters.isVariationProduct(product),
      isLoading: isLoading,
      isATCLoading,
      fulfillmentTypesSupported: product?.fulfillmentTypesSupported as string[],
      onAddOrRemoveWishlistItem: () => handleWishList(product as ProductCustom),
      onClickQuickViewModal: () => openProductQuickViewModal({ product: product as ProductCustom }),
      onClickAddToCart: (payload: any) => handleAddToCart(payload),
    }
  }

  const bannerProps = {
    style: {
      backgroundColor: '#fffddc',
    },
    images: {
      mainImage: '/images/tru/temp/main.png',
      bgLeft: '/images/tru/temp/bg-l.png',
      bgRight: '/images/tru/temp/bg-r.png',
      iconOne: '/images/tru/temp/t-1.png',
      iconTwo: '/images/tru/temp/t-2.png',
      iconThree: '/images/tru/temp/t-3.png',
      iconFour: '/images/tru/temp/t-4.png',
      iconFive: '/images/tru/temp/t-5.png',
    },
    title: 'Toys',
    description:
      "Whether you're looking for the best building toys or the most popular dolls for your little one, we have it all and more.",
  }

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)
  const [filteropen, setFilteropen] = useState<boolean | undefined>(false)

  return (
    <main className="plp-outer">
      {/* <FeedBack />
      <div className="parallax-outer">
        <div className="breadcrumb-outer"><Container><BreadCrumb /></Container></div>
        <Banner {...bannerProps} />
      </div> */}
      {/* <div className="parallax-outer bg-yellow-tint">
        <div className="parallax-col">
          <div className="parallax-content-outer">
            <figure><img src="/images/tru/Dolls.png" alt="" className="img-fluid" /></figure>
            <div className="parallax-content">
              <h1>Dolls & doll play</h1>
              <p>It’s time to doll up! Let your child’s imagination run free with our wonderful collection of dolls, dollhouse sets and accessories.</p>
            </div>
          </div>
        </div>
      </div> */}
      <Container className="plp-banner-outer d-none">
        <Row>
          <Col xs="12" md="4">
            <img
              src="/images/tru/PRODUCTDES-8007-TRU-Back-to-school-Backpacks-Banner-Desktop-Eng.png"
              className="img-fluid"
              alt=""
            />
          </Col>
          <Col xs="12" md="4">
            <img
              src="/images/tru/PRODUCTDES-8007-TRU-Back-to-school-Lunchboxes-Banner-Desktop-Eng.png"
              className="img-fluid"
              alt=""
            />
          </Col>
          <Col xs="12" md="4">
            <img
              src="/images/tru/PRODUCTDES-8007-TRU-Back-to-school-Stationery-Banner-Desktop-Eng.png"
              className="img-fluid"
              alt=""
            />
          </Col>
        </Row>
      </Container>

      <div className="plp-content-outer">
        <Container>
          <Row>
            <Col xs="12" md="4" lg="3">
              <div className={`filter-list ${filteropen ? 'filteropen' : ''}`}>
                <div className="filter-header">
                  <div className="filter-title">Filter by</div>
                  <a href="#" className="filter-clear">
                    Clear All
                  </a>
                  <div className="filter-close">
                    <button className="fc-btn" onClick={() => setFilteropen(false)}>
                      <span>Close</span>
                    </button>
                  </div>
                </div>
                <div className="filter-collapse-outer">
                  {facetList &&
                    facetList
                      .filter(
                        (facet) => facet?.facetType === 'Value' || facet?.facetType === 'RangeQuery'
                      )
                      .map((facet, index) => (
                        <div className="filter-item" key={`facet_${index}`}>
                          <h3 className="filter-item-title" id="fc1">
                            <div className="ft-top">
                              <span>{facet?.label}</span>
                              <i></i>
                            </div>
                            <div className="ft-bottom">{facet?.label}</div>
                          </h3>
                          <UncontrolledCollapse toggler="#fc1" defaultOpen={true}>
                            <ul className="filter-item-select">
                              {facet?.values
                                ?.filter((item) => item?.isDisplayed)
                                .map((item, index) => (
                                  <li key={`facet_values_${index}`}>
                                    <label className="checkbox light-green">
                                      <input type="checkbox" />
                                      <span className="checkmark"></span>
                                      <span className="checklabel">{item?.label}</span>
                                      <span className="checkcount">{item?.count}</span>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </UncontrolledCollapse>
                        </div>
                      ))}
                  <div className="filter-item">
                    <h3 className="filter-item-title expanded" id="fc2">
                      <div className="ft-top">
                        <span>Show all</span>
                        <i></i>
                      </div>
                    </h3>
                    <UncontrolledCollapse toggler="#fc2" defaultOpen={true}>
                      <ul className="filter-item-list">
                        <li>
                          <a href="#" className="filter-item-link">
                            <span>Toys</span>
                            <span>3,525</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="filter-item-link">
                            <span>Sports & outdoor</span>
                            <span>542</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="filter-item-link">
                            <span>Babies</span>
                            <span>1,195</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="filter-item-link">
                            <span>Pretend play & costumes</span>
                            <span>429</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="filter-item-link">
                            <span>Games & puzzles</span>
                            <span>478</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="filter-item-link">
                            <span>Gift Finder</span>
                            <span>1</span>
                          </a>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </div>
                </div>
                <div className="filter-apply">
                  <button className="btn btn-success w-100">Show All Products</button>
                </div>
              </div>
            </Col>
            <Col xs="12" md="8" lg="9">
              <div className="list-data-outer">
                <div className="data-quantity">
                  {t('products-to-show', {
                    m: `${pageSize < totalResults ? pageSize : totalResults}`,
                    n: `${totalResults}`,
                  })}
                </div>
                <div className="data-count"></div>
                <div className="data-sort">
                  <div className="filter-options-mobile">
                    <Button className="filter-option-btn" onClick={() => setFilteropen(true)}>
                      Edit filters
                    </Button>
                  </div>
                  <div className="dropdown-custom">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret color="light">
                        <span>Sort by</span>
                        <svg
                          className="sort-by-icon"
                          version="1.1"
                          viewBox="0 0 10.2 8.4"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="sort-by-icon-arrow-1"
                            d="M2,5.9v-5c0-0.3,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v5l0.6-0.6c0.2-0.2,0.6-0.2,0.9,0c0.2,0.2,0.2,0.6,0,0.9L3.1,7.8c-0.2,0.2-0.6,0.2-0.9,0L0.6,6.2C0.3,6,0.3,5.6,0.6,5.3c0.2-0.2,0.6-0.2,0.9,0L2,5.9z"
                          ></path>
                          <path
                            className="sort-by-icon-arrow-2"
                            d="M2,5.9v-5c0-0.3,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v5l0.6-0.6c0.2-0.2,0.6-0.2,0.9,0c0.2,0.2,0.2,0.6,0,0.9L3.1,7.8c-0.2,0.2-0.6,0.2-0.9,0L0.6,6.2C0.3,6,0.3,5.6,0.6,5.3c0.2-0.2,0.6-0.2,0.9,0L2,5.9z"
                          ></path>
                          <path d="M6.5,4.8c-0.3,0-0.6-0.3-0.6-0.6s0.3-0.6,0.6-0.6H9c0.3,0,0.6,0.3,0.6,0.6S9.3,4.8,9,4.8H6.5z"></path>
                          <path d="M6.5,8C6.2,8,5.9,7.8,5.9,7.4c0-0.3,0.3-0.6,0.6-0.6H9c0.3,0,0.6,0.3,0.6,0.6C9.6,7.8,9.3,8,9,8H6.5z"></path>
                          <path d="M5,1.5c-0.3,0-0.6-0.3-0.6-0.6S4.7,0.3,5,0.3h4c0.3,0,0.6,0.3,0.6,0.6S9.3,1.5,9,1.5H5z"></path>
                        </svg>
                      </DropdownToggle>
                      <DropdownMenu right>
                        {sortingValues?.options?.map((sortingVal, index) => (
                          <DropdownItem
                            onClick={() => onSortItemSelection(sortingVal?.value)}
                            key={`menu_${index}`}
                          >
                            {sortingVal?.value}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="list-items-outer">
                <div className="custom-card-list custom-card">
                  {Array.isArray(products) &&
                    products.length > 0 &&
                    products.map((product) => (
                      // eslint-disable-next-line react/jsx-key
                      <TRUProductCard {...productCardProps(product)} />
                    ))}
                </div>
                <div className="pagination-outer">
                  {!isLoading && onPaginationChange && (
                    <Box display={'flex'} justifyContent={'center'} width="100%" py={10}>
                      <KiboPagination
                        count={pageCount}
                        startIndex={startIndex}
                        pageSize={productPerPage}
                        onPaginationChange={onPaginationChange}
                      />
                    </Box>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="bottom-contents">
            <div className="content-item">
              <h6>Baby Dolls</h6>
              <p>
                At Toys ‘R’ Us, we stock a wide array of cute and cuddly baby dolls for your kids to
                play with. He or she can pretend to be a new parent by caring for a dolly, from
                changing its nappy to feeding it and giving it a refreshing bath. In the mood for a
                short walk? Get the doll’s travel bag and fill it with all the essentials such as
                spare clothes, feeding bottles, stack of diapers and more, and you and your baby are
                ready to head on out.
              </p>
            </div>
            <UncontrolledCollapse toggler="#bContent" className="bottom-content-toggle">
              <Card>
                <CardBody>
                  <h6>Celebrity Dollies</h6>
                  <p>
                    Does your kid want to roam the realm with Anna, have a picnic party on the beach
                    with Barbie or maybe just a tea party with Masha? Now, you can let her or him do
                    it all with our range of dollies that are miniatures of popular characters or
                    personalities. Whether your child is into Disney princesses or fashion dolls,
                    she’ll have hours of playtime with our collection.
                  </p>
                  <h6>Doll Houses</h6>
                  <p>
                    Even dolls need a home and what better way to give them their own space than
                    with our collection of doll houses and castles? The best part is, your child can
                    also decorate these little dwellings with our selection of miniature furniture
                    and dollhouse accessories.
                  </p>
                  <h6>Fashionistas</h6>
                  <p>
                    Future fashion icons will be delighted with our collection of fashion dolls.
                    Most come with their own set of doll clothes and matching shoes and bags, while
                    others also come with beauty accessories so that your child can style them as he
                    or she pleases.
                  </p>
                  <p>
                    Check out our range available online and in our stores in Dubai, Abu Dhabi, Al
                    Ain and Sharjah. Buy online and have your order delivered to any point in the
                    QAT.
                  </p>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
            <Button color="link" id="bContent">
              <i className="icon xxl plus-squircle me-2" />
              {/* <i className="icon xxl minus-squircle me-2" /> */}
              Read more
            </Button>
          </div>
        </Container>
      </div>
    </main>
  )
}
TRUProductListingTemplate.propTypes = {}
export default TRUProductListingTemplate
