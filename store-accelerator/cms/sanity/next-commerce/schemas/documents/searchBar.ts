import { SchemaType } from '@sanity/types';
import { defineField, defineType } from "sanity";

export default defineType({
  name: 'searchBar',
  title: 'Search Bar',
  type: 'object',
  fields: [
    {
      name: 'placeholderText',
      title: 'Placeholder Text',
      type: 'string',
    },
    defineField({
        title: 'translation',
        name: 'translation',
        type: 'localeString',
    }),
    {
        name:'icon',
        title: 'searchIcon',
        type: 'image'
    }
  ],
});