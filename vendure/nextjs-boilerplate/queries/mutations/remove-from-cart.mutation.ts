import { gql } from "@apollo/client";
import { ACTIVE_ORDER_FRAGMENT } from "../fragments/updatedOrder.fragment";

export const removeItemFromOrderMutation = `
  ${ACTIVE_ORDER_FRAGMENT}
  mutation RemoveItemFromOrder($orderLineId: ID!) {
  removeOrderLine(orderLineId: $orderLineId) {
    ...ActiveOrder
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
`;
