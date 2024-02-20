import { defineType } from "sanity";

export default defineType({
    type: 'object',
    name: 'product',
    title: 'Product',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image',
        }, {
            name: 'productId',
            type: 'string',
            title: 'ProductId',
        }

    ],
});