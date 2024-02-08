import { gql } from "@apollo/client";
import { ACTIVE_ORDER_FRAGMENT } from "./fragments/updatedOrder.fragment";

export const GET_ACTIVE_ORDER =  `
  query GetActiveOrder {
    activeOrder {
      ...ActiveOrder
    }
  }
  ${ACTIVE_ORDER_FRAGMENT}
`;