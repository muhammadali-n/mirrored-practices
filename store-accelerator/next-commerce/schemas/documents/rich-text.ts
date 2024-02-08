import { defineType } from "sanity";

export default defineType({
    type: 'object',
    name: 'richText',
    fields:[
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
              {
                type: 'block'
              },
              {
                type: 'image',
                fields: [
                  {
                    type: 'text',
                    name: 'alt',
                    title: 'Alternative text',
                    description: ``,
                    options: {
                      isHighlighted: true
                    }
                  }
                ]
              }
            ]
          },
    ]
})