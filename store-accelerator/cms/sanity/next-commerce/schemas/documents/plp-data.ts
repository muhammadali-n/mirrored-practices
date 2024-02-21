import { defineField, defineType } from "sanity";

const plpData =defineType({
    title:"PlpData",
    name: "plpData",
    type:"document",
    fields:[
        {
            name: 'itemName',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'collections',
            title: 'collections',
            type: 'object',
            fields: [
                {
                    name: 'Name',
                    title: 'collection',
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
            name: 'sortby',
            title: 'sort by',
            type: 'object',
            fields: [
                {
                    name: 'Name',
                    title: 'sort by',
                    type: 'string',
                },
                defineField({
                    title: 'translation',
                    name: 'translation',
                    type: 'localeString',
                }),
            ],
        },
      
    ],
})
export default plpData