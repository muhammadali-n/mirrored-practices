import { defineArrayMember, defineField } from "sanity";
 
export default {
    name: 'productCarousel',
    title: 'Product Carousel',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                { type: "productItem" },
            ]
        }),
    ],
};