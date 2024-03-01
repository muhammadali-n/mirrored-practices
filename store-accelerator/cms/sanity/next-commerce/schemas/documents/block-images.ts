import { defineType } from "sanity";

export default defineType({
    type: 'object',
    name: "blockImages",
    fields: [
        {
            name: 'images',
            type: 'array',
            title: 'Images',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid', 
            },
            validation: Rule => Rule.max(3)
        },
        {
            name: 'richText',
            type: 'array',
            title: 'Rich Text',
            of: [{ type: 'block' }]
        },
        {
            name: 'files',
            type: 'array',
            title: 'Files',
            of: [{ type: 'file' }]
        }
    ]
});
