import { defineField, defineType } from "sanity";

const payment = defineType({
    title: " payment",
    name: 'payment',
    type: 'document',
    fields: [
        defineField({
            title: "name",
            name: "filedName",
            type: 'string',
        }),
        defineField({
            title: "title",
            name: "title",
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "title",
                    name: "title",
                    type: 'localeString',
                }),
            ]
        }),
        defineField({
            title: "description",
            name: 'description',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "description",
                    name: "description",
                    type: 'localeString',
                }),
            ]
        }),
        defineField({
            title: "COD",
            name: 'cod',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    title: "Title",
                    name: "title",
                    type: 'localeString',
                }),
            ]
        })
    ]
})
export default payment