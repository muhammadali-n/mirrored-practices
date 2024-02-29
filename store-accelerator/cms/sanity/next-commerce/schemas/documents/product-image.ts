import { defineType } from "sanity";

export default defineType({
  type: 'object',
  name: 'productImage',
  title: 'ProductImage',
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
      name: 'imageUrl',
      type: 'url',
      title: 'Image URL',
      description: 'URL of the image'
        }
  ]
});