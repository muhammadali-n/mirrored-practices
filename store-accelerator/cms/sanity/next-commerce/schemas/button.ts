import { defineField, defineType } from "sanity";

const button = defineType({
    title: 'Button',
    name: 'button',
    type: 'document',
    fields: [
        defineField({
            title: 'Title',
            name: 'buttonName',
            type: 'string'
        }),
        defineField({
            title: 'path',
            name:'path',
            type: 'string',
            description:"eg: /Cart"
        }),
        defineField({
            title: 'Color',
            name: 'color',
            type: 'string',
            options: {
                list: [
                    { title: 'Red', value: '#ff0000' },
                    { title: 'Green', value: '#00ff00' },
                    { title: 'Blue', value: '#0000ff' },
                ],
            },
            description: "Select a color for the button"
        }),
    ]

})

export default button