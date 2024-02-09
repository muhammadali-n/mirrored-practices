import { defineField, defineType } from "sanity";

const button = defineType({
    title: 'Button',
    name: 'button',
    type: 'document',
    fields: [
        defineField({
            title: 'Button name',
            name: 'buttonName',
            type: 'string'
        }),
        defineField({
            title: 'translation',
            name: 'translation',
            type: 'localeString',
        }),
        // defineField({
        //     title: 'path',
        //     name: 'path',
        //     type: 'string',
        //     description: "eg: /Cart"
        // }),
        defineField({
            title: 'Add a button color',
            name: 'ButtonColor',
            type: 'color',
            options: {
              disableAlpha: true
            }
          }),
       
    ]

})

export default button