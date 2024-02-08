import { OrderDetailFragment } from "../fragments/OrderDetailFragment";
import { ACTIVE_ORDER_FRAGMENT } from "../fragments/updatedOrder.fragment";

export const setCustomerForOrder = `
${ACTIVE_ORDER_FRAGMENT}
mutation setCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
        ...ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
 