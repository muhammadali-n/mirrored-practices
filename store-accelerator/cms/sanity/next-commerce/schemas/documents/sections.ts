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
    {
      name: 'columns',
      type: 'array',
      title: 'Columns',
      options: {
        layout: 'grid',
      },
      of: [{ type: 'column' }],
    },
  ],
});