import { ACTIVE_ORDER_FRAGMENT } from "./fragments/updateOrder.fragments";

export const orderByCode = `
    query GetOrder($code:String!){
        orderByCode(code: $code){
            ...ActiveOrder
        }
    }
    ${ACTIVE_ORDER_FRAGMENT}
` 