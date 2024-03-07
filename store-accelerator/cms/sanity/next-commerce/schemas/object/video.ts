import { defineType } from "sanity";

export default defineType({
  type: 'object',
  name: 'video',
  title: 'Video',
  fields: [
    {
      name: 'videoFile',
      type: 'file', 
      title: 'Video File',
    },
    {
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'URL of the video',
    }
  ]
});