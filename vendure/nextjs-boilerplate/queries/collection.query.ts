import { gql } from "@apollo/client";

export const collectionlist = gql`
query{
  collections{
        items {
      name
      slug
      parent {
        name
          id
        slug
      }
          
      children {
      id
 
      featuredAsset {
        id
        preview
      }
    }
      featuredAsset {
        id
        preview
      }
    }
  }

}
`;