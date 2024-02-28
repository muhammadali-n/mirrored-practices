import { defineField, defineType } from "sanity";

const shipment = defineType({
    title: " Shipment",
    name: 'shipment',
    type: 'document',
    fields: [
        defineField({
            title: "name",
            name: "filedName",
            type: 'string',
        }),
        defineField({
            title: "shipping info",
            name: 'shippingInfo',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: 'contact',
                    name: 'contact',
                    type: 'localeString'
                }),
                defineField({
                    title: 'shipping to',
                    name: 'shippingTo',
                    type: 'localeString'
                }),
                defineField({
                    title: 'change',
                    name: 'change',
                    type: 'localeString'
                })
            ]
        }),
        defineField({
            title: "Shipping method",
            name: 'shippingMethod',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "Title",
                    name: "title",
                    type: 'localeString',
                }),
                defineField({
                    title: 'economy',
                    name: 'economy',
                    type: 'localeString'
                }),
                defineField({
                    title: 'standard',
                    name: 'standard',
                    type: 'localeString'
                })
            ]
        })
    ]
})
export default shipment