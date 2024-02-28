import { defineField } from "sanity";
 
export default {
    name: 'product',
    title: 'Product Item',
    type: 'object',
    fields: [
        defineField({
            name: 'productId',
            title: 'Product Id',
            type: 'string',
        }),
    ],
};