import { ACTIVE_ORDER_FRAGMENT } from "../fragments/updatedOrder.fragment";

export const setOrderShippingAddress = `
${ACTIVE_ORDER_FRAGMENT}
mutation SetShippingMethod($id: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $id) {
        ...ActiveOrder
        ...on ErrorResult {
            errorCode
            message
        }
    }
}
`;
 