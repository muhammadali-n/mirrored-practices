import { ACTIVE_ORDER_FRAGMENT } from "../fragments/updatedOrder.fragment";

export const AddPaymentToOrder = `
${ACTIVE_ORDER_FRAGMENT}
mutation AddPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ...ActiveOrder
      ...on ErrorResult {
        errorCode
        message
      }
    }
  }
`;