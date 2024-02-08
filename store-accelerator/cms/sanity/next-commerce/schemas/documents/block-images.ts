import { defineType } from "sanity";

export default defineType({
    type: 'object',
    name: "blockImages",
    fields: [
        {
            name: 'enabled',
            type: 'boolean',
            title: 'Enable/Disable Block',
        },
        {
            name: 'columns',
            type: 'array',
            title: 'Columns',
            of: [
                {
                    type: 'object',
                    name: 'column',
                    title: 'Column',
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
                        },
                        // Add more fields as needed
                    ]
                }
            ],
        },
    ],
})
