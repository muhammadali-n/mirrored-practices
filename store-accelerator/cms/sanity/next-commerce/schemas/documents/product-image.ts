import { defineType } from "sanity";

export default defineType({
  type: 'object',
  name: 'productImage',
  title: 'Product Image',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    }
  ]
});