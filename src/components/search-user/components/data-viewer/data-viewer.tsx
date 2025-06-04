import UserBar from "./components/user-bar";
import { columns } from "./components/accounts-table.tsx/columns";
import { DataTable } from "./components/accounts-table.tsx/data-table";
import { useOverview } from "../../../../api-hooks/use-overview";

export const DataViewer = () => {
  const { loading, error, data } = useOverview({
    email: "harrisryder321@gmail.com",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 py-0">
      <UserBar userData={data?.userData} />
      <DataTable columns={columns} data={data?.formattedOverview ?? []} />
    </div>
  );
};
