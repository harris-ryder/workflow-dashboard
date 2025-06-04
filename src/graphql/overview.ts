import { gql, useQuery } from "@apollo/client";

// --- Interfaces (remain the same) ---
interface Document {
  id: string;
  name: string;
  slug: string;
}
interface Project {
  id: string;
  name: string;
  documents: Document[];
}
interface Account {
  id: string;
  name: string;
  projects: Project[];
}
interface AccountUser {
  account: Account;
}
interface User {
  id: string;
  accountUsers: AccountUser[];
}
interface UserDataResponse {
  users: User[];
}

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
