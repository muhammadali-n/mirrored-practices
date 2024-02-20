import { defineType } from "sanity";

export default  defineType({
    type: 'object',
    name: 'banner',
    title: 'Banner',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
      }
    ],
  });