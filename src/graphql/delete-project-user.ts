import { gql } from "@apollo/client";

export const DELETE_PROJECT_USER = gql`
  mutation DeleteProjectUser($userId: uuid!, $projectId: uuid!) {
    deleteProjectUsers(
      where: { userId: { _eq: $userId }, projectId: { _eq: $projectId } }
    ) {
      affectedRows
    }
  }
`;