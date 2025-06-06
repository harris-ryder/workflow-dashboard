import type {
  UserDocumentsItem,
  UserData,
} from "../../../../api-hooks/use-overview";
import { columns } from "./components/accounts-table.tsx/columns";
import { DataTable } from "./components/accounts-table.tsx/data-table";
import UserBar from "./components/user-bar";

export const DataViewer = ({
  customerUserData,
  customerDocumentData,
}: {
  customerUserData?: UserData;
  customerDocumentData?: UserDocumentsItem[];
}) => {
  return (
    <div className="p-4 py-0 pb-0 border border-border rounded-lg min-h-0">
      {customerUserData ? (
        <UserBar userData={customerUserData} />
      ) : (
        <div>No user data found</div>
      )}
      <DataTable columns={columns} data={customerDocumentData ?? []} />
    </div>
  );
};
