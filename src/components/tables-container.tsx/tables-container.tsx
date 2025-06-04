import { useOverview } from "../../api-hooks/use-overview";

export const TablesContainer = () => {
  const { loading, error, data } = useOverview({
    email: "harrisryder321@gmail.com",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {data?.users?.[0]?.accountUsers?.map((accountUser) => (
        <div key={accountUser.account.id}>
          <h2>{accountUser.account.name}</h2>
          {accountUser.account.projects?.map((project) => (
            <div key={project.id}>
              <h3>{project.name}</h3>
              {project.documents?.map((doc) => (
                <div key={doc.id}>{doc.name}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
