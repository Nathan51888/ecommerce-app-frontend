import { DataTable } from "@/components/DataTable";
import { Input } from "@/components/ui/input";
import AddOrderModal from "@/features/order/table/AddOrderModal";
import { columns } from "@/features/order/table/columns";

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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Input placeholder="Search..." className="max-w-70" />
          <AddOrderModal />
        </div>
        <DataTable columns={columns} data={data}></DataTable>
      </div>
    </div>
  );
};

export default page;
