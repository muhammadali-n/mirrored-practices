import { defineField, defineType } from "sanity";

export default defineType({
  name: 'storeLogo',
  title: 'store Logo',
  type: 'object',
  fields: [
    {
      name: 'logo',
      title: 'logo',
      type: 'image',
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
    // Add more fields as needed for cart functionality
  ],
});