import { gql } from "@apollo/client";

export const DELETE_DOCUMENT_USER = gql`
  mutation DeleteDocumentUser($userId: uuid!, $documentId: uuid!) {
    deleteDocumentUsers(
      where: {
        _and: [
          { userId: { _eq: $userId } }
          { documentId: { _eq: $documentId } }
        ]
      }
    ) {
      affectedRows
    }
  }
`;
