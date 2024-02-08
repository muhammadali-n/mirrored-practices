export default{
    name: "store-name",
    type: "document",
    tile: "Store name",
    fields: [
        {
            name: "name",
            type: 'string',
            title: "Name of store",
            validation: (Rule:any) => Rule.max(2)
            
        },
        
        {
            name: 'images',
            type: 'array',
            title: 'Store logo',
            of: [{type: 'image'}],
            validation: (Rule:any) => Rule.max(1)

        }
    ]
}