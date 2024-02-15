// cartIcon.ts
import { SchemaType } from '@sanity/types';
import { defineField, defineType } from "sanity";

export default defineType({
  name: 'cartIcon',
  title: 'Cart Icon',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
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
  ],
});