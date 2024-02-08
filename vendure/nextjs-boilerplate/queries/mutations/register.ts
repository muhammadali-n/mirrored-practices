export const register = `
mutation Register($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      ... on Success {
        success
      }
      ...on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
