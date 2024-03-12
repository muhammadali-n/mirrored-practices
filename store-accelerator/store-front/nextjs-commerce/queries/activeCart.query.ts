import {ACTIVE_ORDER_FRAGMENT} from './fragments/updateOrder.fragments'
export const fetchCart = `
    query GetCart{
        activeOrder{
            ...ActiveOrder
        }
    }
    ${ACTIVE_ORDER_FRAGMENT}
`