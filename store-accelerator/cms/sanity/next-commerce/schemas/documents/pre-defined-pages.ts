import { defineField, defineType } from "sanity";

const preDefinedPage =defineType({
    title:"Pre defined pages",
    name: "preDefinedPages",
    type:"document",
    fields:[
        defineField({
            title: 'Title',
            name: 'title',
            type: 'string',
        }),


    ]
})
export default preDefinedPage