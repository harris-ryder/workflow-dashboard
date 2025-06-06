import type { ColumnDef } from "@tanstack/react-table";
import type { UserDocumentsItem } from "../../../../../../api-hooks/use-overview";
import { OpenDocumentButton } from "./open-document";
import { ToggleJoinDocument } from "./toggle-join-document";

export const columns: ColumnDef<UserDocumentsItem>[] = [
  {
    id: "account.name",
    accessorKey: "account.name",
    header: "Account Name",
  },
  {
    accessorKey: "account.id",
    header: "Account ID",
  },
  {
    accessorKey: "project.name",
    header: "Project Name",
  },
  {
    accessorKey: "project.id",
    header: "Project ID",
  },
  {
    accessorKey: "document.name",
    header: "Document Name",
  },
  {
    accessorKey: "document.id",
    header: "Document ID",
  },
  {
    accessorKey: "document.slug",
    header: "Document Slug",
  },
  {
    accessorKey: "document.isMyUserDocumentMember",
    header: "Join Task",
    cell: ({ row }) => {
      return (
        <ToggleJoinDocument
          documentId={row.original.document.id}
          accountId={row.original.account.id}
          isMember={row.original.document.isMyUserDocumentMember}
        />
      );
    },
  },
  {
    id: "open.docment",
    header: "Open",
    cell: ({ row }) => {
      return <OpenDocumentButton documentSlug={row.original.document.slug} />;
    },
  },
];
