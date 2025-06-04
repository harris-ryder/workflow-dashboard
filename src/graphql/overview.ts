import { gql } from "@apollo/client";

// Query for email lookup
const GET_USER_OVERVIEW_BY_EMAIL = gql`
  query UserDataByEmail($email: String!) {
    # Email is now mandatory for this specific query
    users(where: { email: { _eq: $email } }) {
      id
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
  }
`;

// Query for userId lookup
const GET_USER_OVERVIEW_BY_ID = gql`
  query UserDataById($userId: uuid!) {
    # userId is now mandatory for this specific query
    users(where: { id: { _eq: $userId } }) {
      id
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
  }
`;
