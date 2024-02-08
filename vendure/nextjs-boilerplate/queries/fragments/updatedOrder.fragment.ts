import { gql } from "@apollo/client";

export const ACTIVE_ORDER_FRAGMENT = `
fragment ActiveOrder on Order {
  __typename
  id
  code
  couponCodes
  state
  currencyCode
  totalQuantity
  subTotalWithTax
  shippingWithTax
  totalWithTax
  discounts {
    description
    amountWithTax
  }
  lines {
    id
    unitPriceWithTax
    quantity
    linePriceWithTax
    productVariant {
      id
      name
      sku
    }
    featuredAsset {
      id
      preview
    }
  }
  customer{
    firstName
    lastName
    emailAddress
    phoneNumber
  }
  shippingAddress{
    fullName
    city
    streetLine1
    countryCode
    postalCode
    phoneNumber
  }
  shippingLines {
    shippingMethod {
      description
    }
    priceWithTax
  }
}`;