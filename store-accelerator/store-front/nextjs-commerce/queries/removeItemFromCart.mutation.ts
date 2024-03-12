import {ACTIVE_ORDER_FRAGMENT} from './fragments/updateOrder.fragments'
export const removeCartItemQuery = `
mutation RemoveItemFromOrder($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      ...ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
  ${ACTIVE_ORDER_FRAGMENT}
`