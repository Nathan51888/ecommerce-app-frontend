"use server";

import { OrderAddFormSchema } from "./table/AddOrderModal";
import { Order } from "./types";

export const apiPostOrder = async (
  order: OrderAddFormSchema,
): Promise<Order | null> => {
  try {
    const res = await fetch("http://localhost:5103/api/admin/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("apiPostOrder error: ", error);
    return null;
  }
};

export const apiGetOrderAll = async (): Promise<Order[]> => {
  var res = await fetch("http://localhost:5103/api/admin/orders");
  var data = res.json();
  return data;
};
