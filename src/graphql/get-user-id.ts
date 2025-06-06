import { gql } from "@apollo/client";

export const GET_USER_ID = gql`
  query GetUserId($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;
