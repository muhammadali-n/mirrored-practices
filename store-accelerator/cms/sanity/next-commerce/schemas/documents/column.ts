import { defineArrayMember, defineType } from "sanity";

export default defineType({
    type: 'object',
    name: "column",
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
                { title: "Hero image", type: "image" },
                { title: "Video", type: "file" },
                defineArrayMember({ type: "blockImages" }),
                defineArrayMember({ type: "richText" }),
            ],
        },
    ],
})
