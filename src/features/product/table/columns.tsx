import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  description: string;
  priceRegular: number;
  priceDiscount: number;
  stockAmount: number;
  category: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "priceRegular",
    header: "Price Regular",
  },
  {
    accessorKey: "priceDiscount",
    header: "Price Discount",
  },
  {
    accessorKey: "stockAmount",
    header: "Stock Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
];
