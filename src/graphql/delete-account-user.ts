import { gql } from "@apollo/client";

export const DELETE_ACCOUNT_USER = gql`
  mutation DeleteAccountUser($userId: uuid!, $accountId: uuid!) {
    deleteAccountUsers(
      where: { userId: { _eq: $userId }, accountId: { _eq: $accountId } }
    ) {
      affectedRows
      returning {
        id
        email
      }
    }
  }
`;
