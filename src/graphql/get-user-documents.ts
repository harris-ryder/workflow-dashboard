import { gql } from "@apollo/client";

export const GET_USER_DOCUMENTS = gql`
  query UserDocuments($userId: uuid!) {
    usersByPk(id: $userId) {
      accountUsers {
        account {
          id
        }
      }
      projectUsers {
        project {
          id
        }
      }
      documentUsers {
        document {
          id
          project {
            id
          }
        }
      }
    }
  }
`;
