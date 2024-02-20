import { defineType } from "sanity";

export default defineType({
  type: 'object',
  name: 'productcarousel',
  title: 'Product Carousel',
  fields: [
    {
      name: 'productcarousel',
      type: 'array',
      title: 'Productcarousel',
      of: [{ type: 'productImage' }] 
    }
  ]
});