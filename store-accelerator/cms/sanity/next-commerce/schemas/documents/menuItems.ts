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