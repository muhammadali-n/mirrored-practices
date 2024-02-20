import { defineType } from "sanity";

export default defineType({
  type: 'object',
  name: 'productName',
  title: 'Product Name',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    }
  ]
});