import type {
  FormattedOverviewItem,
  UserData,
} from "../../../../api-hooks/use-overview";
import { columns } from "./components/accounts-table.tsx/columns";
import { DataTable } from "./components/accounts-table.tsx/data-table";
import UserBar from "./components/user-bar";

export const DataViewer = ({
  data,
}: {
  data: {
    userData?: UserData;
    formattedOverview?: FormattedOverviewItem[];
  };
}) => {
  return (
    <div className="p-4 py-0 pb-4 border border-border rounded-lg">
      {data?.userData ? (
        <UserBar userData={data.userData} />
      ) : (
        <div>No user data found</div>
      )}
      <DataTable columns={columns} data={data?.formattedOverview ?? []} />
    </div>
  );
};
