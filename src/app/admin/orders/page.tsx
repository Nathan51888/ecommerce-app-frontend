import { DataTable } from "@/components/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "@/features/order/columns";

const getData = async (): Promise<any> => {
  var res = await fetch("http://localhost:5103/api/admin/orders");
  var data = res.json();
  return data;
};

const page = async () => {
  const data = await getData();
  return (
    <div>
      <h1>Orders</h1>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default page;
