import { useOverview } from "../../api-hooks/use-overview";
import UserBar from "../user-bar";
import { columns } from "./accounts-table.tsx/columns";
import { DataTable } from "./accounts-table.tsx/data-table";

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
