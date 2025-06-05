import { gql } from "@apollo/client";

export const GET_USER_ACCOUNTS = gql`
  query UserAccounts($email: String) {
    users(where: { email: { _eq: $email } }) {
      accountUsers {
        account {
          id
        }
      }
    }
  }
`;
