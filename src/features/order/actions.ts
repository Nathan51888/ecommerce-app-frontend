"use server";

import { revalidatePath } from "next/cache";
import { OrderAddFormSchema } from "./table/AddOrderModal";
import { apiPostOrder } from "./api";

export const actionOrderAdd = async (
  data: OrderAddFormSchema,
): Promise<any> => {
  try {
    const res = await apiPostOrder(data);
    revalidatePath("/admin/orders");
    return res;
  } catch (error) {
    console.log(error);
  }
};
