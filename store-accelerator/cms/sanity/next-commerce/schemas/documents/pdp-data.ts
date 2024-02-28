import { defineField, defineType } from "sanity";

const plpData =defineType({
    title:"PdpData",
    name: "pdpData",
    type:"document",
    fields:[
        defineField({
            title: 'Name',
            name: 'itemName',
            type: 'string',
        }),
        { 
        name: 'leftArrow',
        title: 'Left Arrow',
        type: 'object',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'image',
          },
          {
            name: 'alt',
            title: 'Alternative text',
            type: 'text',
          },
          defineField({
            title: 'translation',
            name: 'translation',
            type: 'localeString',
        }),
        ]},
        { 
            name: 'rightArrow',
            title: 'Right Arrow',
            type: 'object',
            fields: [
              {
                name: 'icon',
                title: 'Icon',
                type: 'image',
              },
              {
                name: 'alt',
                title: 'Alternative text',
                type: 'text',
              },
              defineField({
                title: 'translation',
                name: 'translation',
                type: 'localeString',
            }),
            ]},
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'button',
          }),
          {
            name: 'products',
            title: 'products',
            type: 'object',
            fields: [
                {
                    name: 'Name',
                    title: 'product',
                    type: 'string',
                },
                defineField({
                    title: 'translation',
                    name: 'translation',
                    type: 'localeString',
                }),
            ],
        },
        {
          name: 'outOfStock',
          title: 'out Of Stock',
          type: 'object',
          fields: [
              {
                  name: 'Name',
                  title: 'Name',
                  type: 'string',
              },
              defineField({
                  title: 'translation',
                  name: 'translation',
                  type: 'localeString',
              }),
          ],
      },
      
    ]
})
export default plpData