
import { defineField, defineType } from "sanity";

export default defineType({
  type: 'object',
  name: 'textWithLink',
  title: 'Text with Link',
  fields: [
    {
      name: 'text',
      type: 'text',
      title: 'Text',
    },
    {
      name: 'link',
      type: 'url',
      title: 'Link',
      description: 'Optional: URL link associated with the text',
    },
    defineField({
      title: 'translation',
      name: 'translation',
      type: 'localeString',
  }),
  ]
});