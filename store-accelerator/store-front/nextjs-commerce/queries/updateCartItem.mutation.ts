import {ACTIVE_ORDER_FRAGMENT} from './fragments/updateOrder.fragments'
export const updateCartItemQuery = `
mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
  adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
    ...ActiveOrder
    ... on ErrorResult {
        errorCode
        message
    }
  }
}
${ACTIVE_ORDER_FRAGMENT}
`