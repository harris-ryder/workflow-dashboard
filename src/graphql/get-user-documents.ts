import { gql } from "@apollo/client";

export const GET_USER_DOCUMENTS = gql`
  query UserDocuments($userId: uuid!) {
    usersByPk(id: $userId) {
      documentUsers {
        document {
          id
        }
      }
    }
  }
`;

export const USER_DOCUMENTS_SUBSCRIPTION = gql`
  subscription UserDocumentsRealtime($userId: uuid!) {
    usersByPk(id: $userId) {
      documentUsers {
        document {
          id
        }
      }
    }
  }
`;
