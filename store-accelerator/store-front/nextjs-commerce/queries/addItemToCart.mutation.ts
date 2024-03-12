export const addItemToCartQuery =`
mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order{
          code
          type
          createdAt
      }
      ... on ErrorResult {
        errorCode
        message
      }
      ... on InsufficientStockError {
        quantityAvailable
      }
    }
  }
`
