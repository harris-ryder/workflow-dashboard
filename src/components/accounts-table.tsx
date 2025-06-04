import React from "react";
import { useGetUserOverview } from "../api-hooks/use-get-user-overview";

const AccountsTable: React.FC = () => {
  const { loading, error, userOverview } = useGetUserOverview({
    email: "harrisryder321@gmail.com",
  });

  if (loading) {
    return <div>Loading user overview...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading user overview!</div>;
  }

  return (
    <div className="user-overview">
      {userOverview?.map((user) => (
        <div key={user.id} className="user-account">
          {user.accountUsers.map((accountUser) => (
            <div key={accountUser.account.id} className="account">
              <h3>{accountUser.account.name}</h3>
              <ul>
                {accountUser.account.projects.map((project) => (
                  <li key={project.id}>
                    <h4>{project.name}</h4>
                    <ul>
                      {project.documents.map((document) => (
                        <li key={document.id}>
                          {document.name} ({document.slug})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AccountsTable;
