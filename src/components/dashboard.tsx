import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      firstName
    }
  }
`;

interface User {
  id: string;
  firstName: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className="user-item">
              <span className="user-name">{user.firstName}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const useUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  return { loading, error, users: data?.users };
};

const UserListContainer: React.FC = () => {
  const { loading, error, users } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading users!</div>;
  }

  return <UserList users={users} />;
};

export default UserListContainer;
