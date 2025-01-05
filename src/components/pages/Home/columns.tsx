// Components
import { ColumnDef } from "@tanstack/react-table"

// Type
import { Product } from "@/types/Product"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
]