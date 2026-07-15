import { DataTable } from "@/components/DataTable";
import { columns as CategoryColumns } from "@/features/category/table/columns";
import AddCategoryModal from "@/features/category/table/AddCategoryModal";
import { apiGetCategoryAll } from "@/features/category/api";
import { Input } from "@/components/ui/input";

const page = async () => {
  const categoryData = await apiGetCategoryAll();
  return (
    <div>
      <h1>Categories</h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Input placeholder="Search..." className="max-w-70" />
          <AddCategoryModal />
        </div>
        <DataTable columns={CategoryColumns} data={categoryData}></DataTable>
      </div>
    </div>
  );
};

export default page;
