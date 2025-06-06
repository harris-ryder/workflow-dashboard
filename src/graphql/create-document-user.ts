import { gql } from "@apollo/client";

export const CREATE_DOCUMENT_USER = gql`
  mutation CreateDocumentUser(
    $userId: uuid!
    $documentId: uuid!
    $accountId: uuid!
  ) {
    insertDocumentUsersOne(
      object: {
        userId: $userId
        documentId: $documentId
        accountId: $accountId
        guest: true
      }
    ) {
      id
    }
  }
`;
