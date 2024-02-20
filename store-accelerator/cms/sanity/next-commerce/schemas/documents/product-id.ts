import { defineType } from "sanity";

export default defineType({
  type: 'object',
  name: 'productId',
  title: 'Product Id',
  fields: [
    {
      name: 'productId',
      type: 'string',
      title: 'ProductId',
    }
  ]
});