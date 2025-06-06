import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { UserDocumentsItem } from "../../../../../../api-hooks/use-overview";
import { Button } from "../../../../../../ui/shadcn-primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../../ui/shadcn-primitives/dropdown-menu";
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
    accessorKey: "document.isMyUserDocumentMember",
    header: "Join Task",
    cell: ({ row }) => {
      return (
        <ToggleJoinDocument
          userId={row.original.document.id}
          documentId={row.original.document.id}
          accountId={row.original.account.id}
          isMember={row.original.document.isMyUserDocumentMember}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const document = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(document.document.id)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
