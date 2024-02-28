import { defineField } from "sanity";
 
export default {
    name: 'productItem',
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