import { gql } from "@apollo/client";

const USER_OVERVIEW_FRAGMENT = gql`
  fragment UserOverview on Users {
    id
    email
    firstName
    lastName
    profilePictureUrl
    createdAt
    lastSignInAt
    accountUsers {
      account {
        id
        name
        projects {
          id
          name
          documents {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_USER_OVERVIEW_BY_EMAIL = gql`
  query UserDataByEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      ...UserOverview
    }
  }
  ${USER_OVERVIEW_FRAGMENT}
`;

export const GET_USER_OVERVIEW_BY_ID = gql`
  query UserDataById($userId: uuid!) {
    users(where: { id: { _eq: $userId } }) {
      ...UserOverview
    }
  }
  ${USER_OVERVIEW_FRAGMENT}
`;
