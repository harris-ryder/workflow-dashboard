import { gql } from "@apollo/client";

export const CREATE_PROJECT_USER = gql`
  mutation CreateProjectUser(
    $userId: uuid!
    $projectId: uuid!
    $accountId: uuid!
    $guest: Boolean = true
    $createdAt: timestamp = "NOW()"
    $updatedAt: timestamp = "NOW()"
  ) {
    insertProjectUsersOne(
      object: {
        userId: $userId
        projectId: $projectId
        accountId: $accountId
        guest: $guest
        createdAt: $createdAt
        updatedAt: $updatedAt
      }
    ) {
      id
    }
  }
`;