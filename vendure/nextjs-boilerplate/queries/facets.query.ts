import { gql } from "@apollo/client";

export const FacetsList = gql`
query {
    facets {
      totalItems
      items {
        id
        name
        code
        values {
          id
          name
        }
      }
    }
  }
`;
