
import { ACTIVE_ORDER_FRAGMENT } from "../fragments/updatedOrder.fragment";

export const addItemToOrderMutation = `
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      Order{
        state
        type
        createdAt
      }
    }
  }
`
 