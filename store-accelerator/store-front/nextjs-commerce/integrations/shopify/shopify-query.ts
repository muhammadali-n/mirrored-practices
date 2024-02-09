export const getProductsByCollectionQuery = `
  query GetProductsByCollection($collectionId: ID!) {
    collection(id: $collectionId) {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      products(sortKey: $sortKey, reverse: $reverse, first: 100) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;
