import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../../../../../ui/shadcn-primitives/dropdown-menu";
import { DropdownMenuLabel } from "../../../../../../ui/shadcn-primitives/dropdown-menu";
import { DropdownMenuContent } from "../../../../../../ui/shadcn-primitives/dropdown-menu";
import { DropdownMenuTrigger } from "../../../../../../ui/shadcn-primitives/dropdown-menu";
import { DropdownMenu } from "../../../../../../ui/shadcn-primitives/dropdown-menu";
import { Button } from "../../../../../../ui/shadcn-primitives/button";
import type { ColumnDef } from "@tanstack/react-table";
import type { FormattedOverviewItem } from "../../../../../../api-hooks/use-overview";

export const columns: ColumnDef<FormattedOverviewItem>[] = [
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
