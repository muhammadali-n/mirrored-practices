import { gql } from "@apollo/client";

export const CollectionProductsList = gql`
  query($slug: String!,$ids: [ID!]) {
   search(
    input: {
      collectionSlug: $slug,                        
      groupByProduct: true,
     facetValueIds: $ids,
       }
  ) {
    totalItems
    items {
      productName
      slug
      productAsset {
        id
        preview
      }
      priceWithTax {
        ... on SinglePrice {
          value
        }
        ... on PriceRange {
          min
          max
        }
      }
      currencyCode
    }
  }
  }
`;

