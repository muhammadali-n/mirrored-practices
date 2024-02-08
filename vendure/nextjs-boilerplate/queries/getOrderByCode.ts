import { ACTIVE_ORDER_FRAGMENT } from "./fragments/updatedOrder.fragment";

export const getOrderByCode = `
${ACTIVE_ORDER_FRAGMENT}
query GetOrderByCode($code: String!) {
    orderByCode(code: $code) {
        ...ActiveOrder
    }
  }
`;
