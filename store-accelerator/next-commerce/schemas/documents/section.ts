export default {
    name: 'threeColumn',
    title: 'Three Column',
    type: 'object',
    fields: [
      {
        name: 'column1',
        title: 'Column 1',
        type: 'array',
        of: [{type: 'block'}]
      },
      {
        name: 'column2',
        title: 'Column 2',
        type: 'array',
        of: [{type: 'block'}]
      },
      {
        name: 'column3',
        title: 'Column 3',
        type: 'array',
        of: [{type: 'block'}]
      }
    ]
  }