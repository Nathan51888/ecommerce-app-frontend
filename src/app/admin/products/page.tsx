import { DataTable } from "@/components/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns as ProductColumns } from "@/features/product/table/columns";
import { columns as CategoryColumns } from "@/features/product/category/columns";
import { Product } from "@/features/product/types";
import { Category } from "@/features/product/category/types";
import AddForm from "@/features/product/form";

const getProductsData = async (): Promise<Product[]> => {
  var res = await fetch("http://localhost:5103/api/admin/products");
  var data = res.json();
  return data;
};

const getCategoriesData = async (): Promise<Category[]> => {
  var res = await fetch("http://localhost:5103/api/admin/categories");
  var data = res.json();
  return data;
};

const page = async () => {
  const productData = await getProductsData();
  const categoryData = await getCategoriesData();
  return (
    <div>
      <h1>Products</h1>
      <Tabs>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <div className="flex items-center">
            <AddForm></AddForm>
          </div>
        </div>
        <TabsContent value="products">
          <DataTable columns={ProductColumns} data={productData}></DataTable>
        </TabsContent>
        <TabsContent value="categories">
          <h1>Categories</h1>
          <DataTable columns={CategoryColumns} data={categoryData}></DataTable>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
