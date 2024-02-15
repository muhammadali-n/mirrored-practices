import { defineField, defineType } from "sanity";

const cartItems =defineType({
    title:"Cart tems",
    name: "cartItems",
    type:"document",
    fields:[
        defineField({
            title: 'Name',
            name: 'itemName',
            type: 'string',
        }),
        defineField({
            name: 'sections',
            title: 'field',
            type: 'button',
        }),
        // defineField({
        //     title: 'taxes',
        //     name: 'taxes_fields',
        //     type: 'localeString',
        // }),
        // defineField({
        //     title: 'shipping',
        //     name: 'shipping_fields',
        //     type: 'localeString',
        // }),
        // defineField({
        //     title: 'total',
        //     name: 'total_fields',
        //     type: 'localeString',
        // }),
    ]
})
export default cartItems