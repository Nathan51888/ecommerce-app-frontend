import { columns, Product } from "@/features/product/table/columns";
import { DataTable } from "@/features/product/table/data-table";

const getData = async (): Promise<Product[]> => {
  var res = await fetch("http://localhost:5103/api/admin/products");
  var data = res.json();
  return data;
};

const page = async () => {
  const data = await getData();
  return (
    <div>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default page;
