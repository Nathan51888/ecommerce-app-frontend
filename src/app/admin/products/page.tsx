import { DataTable } from "@/components/DataTable";
import { columns as ProductColumns } from "@/features/product/table/columns";
import AddProductModal from "@/features/product/table/AddProductModal";
import { apiGetProductAll } from "@/features/product/api";
import { Input } from "@/components/ui/input";

const page = async () => {
  const productData = await apiGetProductAll();

  return (
    <div>
      <h1>Products</h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Input placeholder="Search..." className="max-w-70" />
          <AddProductModal />
        </div>
        <DataTable columns={ProductColumns} data={productData}></DataTable>
      </div>
    </div>
  );
};

export default page;
