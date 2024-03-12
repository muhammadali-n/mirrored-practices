import {ACTIVE_ORDER_FRAGMENT} from './fragments/updateOrder.fragments'
export const createCartQuery = `
    mutation AddItemToOrder($productVariantId: ID!, $quantity:Int!){
        addItemToOrder(productVariantId:$productVariantId,quantity:$quantity){
            ...ActiveOrder
        }
    }
    ${ACTIVE_ORDER_FRAGMENT}
`