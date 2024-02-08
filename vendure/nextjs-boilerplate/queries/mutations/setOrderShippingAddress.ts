import { OrderDetailFragment } from "../fragments/OrderDetailFragment";
import { ACTIVE_ORDER_FRAGMENT } from "../fragments/updatedOrder.fragment";

export const setOrderShippingAddress = `
mutation setOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
 