import { gql } from "@apollo/client";
export const productSearch = gql`
query SearchProducts($term: String!) {
  search(input: {
    term: $term }) {
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
      }
      currencyCode
    }
  }
}
`;