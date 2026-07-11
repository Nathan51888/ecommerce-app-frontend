"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";

export type Order = {
  id: string;
  orderAddress: string;
  orderDate: string;
  orderStatus:
    "pending" | "processing" | "shipping" | "delivered" | "refunded" | "failed";
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "orderAddress",
    header: "Order Address",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("orderStatus");
      return (
        <Badge
          className={cn(
            `bg-gray-200 text-gray-600`,
            status === "pending" && "bg-gray-200 text-gray-600",
            status === "processing" && "bg-amber-200 text-amber-700",
            status === "shipping" && "bg-sky-200 text-sky-700",
            status === "delivered" && "bg-green-200 text-green-700",
            status === "refunded" && "bg-violet-200 text-violet-700",
            status === "failed" && "bg-red-200 text-red-700",
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost">
                <span className="sr-only">Open menu</span>
                <Ellipsis />
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
