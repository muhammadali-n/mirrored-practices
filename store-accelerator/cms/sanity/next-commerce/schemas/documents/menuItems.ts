import { defineField, defineType } from "sanity";

export default defineType({
  name: 'menuItems',
  title: 'menu Items',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'text',
    },
    {
      name: 'alt',
      title: 'Alternative text',
      type: 'text',
    },
    defineField({
      title: 'translation',
      name: 'translation',
      type: 'localeString',
  }),
  defineField({
            title: 'path',
            name: 'path',
            type: 'string',
        }),
  ],
});