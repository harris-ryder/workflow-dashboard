import { gql } from "@apollo/client";

export const GET_USER_DOCUMENTS = gql`
  query UserDocuments($email: String) {
    users(where: { email: { _eq: $email } }) {
      documentUsers {
        document {
          id
        }
      }
    }
  }
`;
