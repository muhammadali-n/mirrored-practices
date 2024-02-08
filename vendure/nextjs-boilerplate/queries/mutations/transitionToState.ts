import { gql } from "@apollo/client";
import { ACTIVE_ORDER_FRAGMENT } from "../fragments/updatedOrder.fragment";

export const TransitionToState = `
${ACTIVE_ORDER_FRAGMENT}
mutation TransitionToState($state: String!) {
  transitionOrderToState(state: $state) {
    ...ActiveOrder
    ...on OrderStateTransitionError {
      errorCode
      message
      transitionError
      fromState
      toState
    }
  }
}
`;
