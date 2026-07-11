import { DataTablePagination } from "@/components/DataTablePagination";
import OrdersDataTable from "@/features/order/OrdersDataTable";

const getData = async (): Promise<any> => {
  var res = await fetch("http://localhost:5103/api/admin/orders");
  var data = res.json();
  return data;
};

const page = async () => {
  const data = await getData();
  return (
    <div>
      <OrdersDataTable data={data}></OrdersDataTable>
    </div>
  );
};

export default page;
