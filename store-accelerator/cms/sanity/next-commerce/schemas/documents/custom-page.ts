import { defineArrayMember, defineField } from "sanity";

export default {
  name: 'nav', //TODO :change to custom page
  title: 'Custom page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'translation',
      name: 'translation',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { title: "Hero image", type: "image" },
        { title: "Video", type: "file" },
        defineArrayMember({ type: "blockImages" }),
        defineArrayMember({ type: "richText" }),
      ]
    }),
  ],
};
