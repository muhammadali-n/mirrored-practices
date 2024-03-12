export const collectionProductsList = `
    query GetCollectionProducts($slug:String){
        collection(slug:$slug){
            productVariants{
                totalItems
                items{
                    id
                    name
                    price
                    product{
                        featuredAsset{
                            preview
                        }
                    }
                }
            }
        }
    }
`