import { defineArrayMember, defineField, defineType } from "sanity";
 
const productBlocks = defineType({
    name: 'productBlocks',
    title: 'Product Blocks',
    type: 'object',
    fields: [
        defineField({
            name: 'columns',
            title: 'Column',
            type: 'array',
            of: [
                { type: 'columns' } // Corrected the type reference
            ],
            options: {
                layout: 'grid'
            },
            validation: Rule => Rule.max(4).error('Can only split up to 4 columns.')
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Product Block',
            }
        }
    }
});
 
const columns = defineType({
    name: 'columns',
    title: 'Columns',
    type: 'object',
    fields: [
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                { type: "product" } // Corrected the type reference
            ],
            options: {
                layout: 'grid'
            },
            validation: Rule => Rule.max(2).error('Can only add up to 2 products in a column.')
        }),
    ],
})
 
export { columns, productBlocks };
