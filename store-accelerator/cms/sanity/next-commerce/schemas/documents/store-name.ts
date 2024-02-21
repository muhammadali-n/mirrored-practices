import { defineField, defineType } from "sanity";

export default defineType({
  name: 'storeName',
  title: 'store Name',
  type: 'object',
  fields: [
    {
        name: 'Name',
        title: 'store name',
        type: 'string',
      },
    defineField({
      title: 'translation',
      name: 'translation',
      type: 'localeString',
  }),
  ],
});