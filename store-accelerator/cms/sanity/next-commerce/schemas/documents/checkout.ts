import { defineField, defineType } from "sanity";

const checkout = defineType({
    title: "Checkout",
    name: "checkout",
    type: "document",
    fields: [
        defineField({
            title: "name",
            name: "itemName",
            type: 'string'
        }),
        defineField({
            title: 'Checkout process',
            name: 'checkoutProcess',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "cart",
                    name: 'cart',
                    type: "localeString"
                }),
                defineField({
                    title: "information",
                    name: 'information',
                    type: "localeString"
                }),
                defineField({
                    title: "shipping",
                    name: 'shipping',
                    type: "localeString"
                }),
                defineField({
                    title: "payment",
                    name: 'payment',
                    type: "localeString"
                })
            ]
        }),
        defineField({
            title: 'Contact',
            name: 'Contact',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "Title",
                    name: 'title',
                    type: "localeString"
                }),
                defineField({
                    title: "Input email placeholder",
                    name: 'placeholder',
                    type: "localeString"
                }),
                defineField({
                    title: "Subscription text",
                    name: 'subscription',
                    type: "localeString"
                }),
            ]
        }),
        defineField({
            title: 'Shipping',
            name: 'shipping',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "Title",
                    name: 'title',
                    type: "localeString"
                }),
                defineField({
                    title: "country/region",
                    name: 'country',
                    type: "localeString"
                }),
                defineField({
                    title: "first name",
                    name: 'firstName',
                    type: "localeString"
                }),
                defineField({
                    title: "Last name",
                    name: 'lastName',
                    type: "localeString"
                }),
                defineField({
                    title: "Address",
                    name: 'address',
                    type: "localeString"
                }),
                defineField({
                    title: "Apartment",
                    name: 'apartment',
                    type: "localeString"
                }),
                defineField({
                    title: "City",
                    name: 'city',
                    type: "localeString"
                }),
                defineField({
                    title: "State",
                    name: 'state',
                    type: "localeString"
                }),
                defineField({
                    title: "Zip",
                    name: 'zip',
                    type: "localeString"
                }),
                defineField({
                    title: "Save information text",
                    name: 'saveInfo',
                    type: "localeString"
                }),
            ]
        }),
        defineField({
            title: 'Bottom buttons',
            name: 'bottomButtons',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "Return to cart",
                    name: 'returnToCart',
                    type: "localeString"
                }),
                defineField({
                    title: "Continue shopping",
                    name: 'continueShoppingButton',
                    type: "localeString"
                }),
            ]
        }),
        defineField({
            title: 'Copyright notice',
            name: 'copyrightNotice',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "All rights reserved ",
                    name: 'rights',
                    type: "localeString"
                }),
                defineField({
                    title: "Shop name",
                    name: 'shopName',
                    type: "localeString"
                }),
            ]
        }),
        defineField({
            title: 'Quantity info',
            name: 'quantityInfo',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "Sub total",
                    name: 'subTotal',
                    type: "localeString"
                }),
                defineField({
                    title: "Shipping",
                    name: 'shipping',
                    type: "localeString"
                }),
                defineField({
                    title: "Total",
                    name: 'total',
                    type: "localeString"
                }),
            ]
        }),

    ]
})
export default checkout