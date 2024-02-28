import { defineType } from "sanity";

export default  defineType({
  type: 'object',
  name: 'sections',
  title: 'Sections',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
  ],
});