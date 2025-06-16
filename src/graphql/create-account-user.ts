import { gql } from "@apollo/client";

export const CREATE_ACCOUNT_USER = gql`
  mutation CreateAccountUser(
    $userId: uuid!
    $accountId: uuid!
    $firstName: String = null
    $lastName: String = null
    $email: String = null
    $role: AccountUserRolesEnum = TEAMMATE
    $createdAt: timestamp = "NOW()"
    $updatedAt: timestamp = "NOW()"
  ) {
    insertAccountUsersOne(
      object: {
        userId: $userId
        accountId: $accountId
        firstName: $firstName
        lastName: $lastName
        email: $email
        role: $role
        createdAt: $createdAt
        updatedAt: $updatedAt
      }
    ) {
      id
    }
  }
`;
