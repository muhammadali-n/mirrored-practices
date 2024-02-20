import { defineArrayMember, defineType } from "sanity";

export default  defineType({
    type: 'object',
    name: 'column',
    title: 'Column',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
          },
        {
          name: 'widgets',
          type: 'array',
          title: 'Widgets',
          options: {
            layout: 'grid'
          },       
          of: [
            { type: 'productId' },
            { type: 'productName' },
            { type: 'productImage' },
            { type: 'banner' },
            { title: "Hero image", type: "image" },
            { title: "Video", type: "file" },
            defineArrayMember({ type: "blockImages" }),
            defineArrayMember({ type: "richText" })
        ],
        }
      ],
  });