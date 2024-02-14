import { defineField, defineType } from "sanity";

const productCard =defineType({
    title:"ProductCard",
    name: "ProductCard",
    type:"document",
    fields:[
        defineField({
            title: 'Name',
            name: 'itemName',
            type: 'string',
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'button',
          }),
      
    ]
})
export default productCard