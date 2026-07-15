"use server";

import { ProductAddFormSchema } from "./table/AddProductModal";
import { Product } from "./types";

export const apiPostProduct = async (
  product: ProductAddFormSchema,
): Promise<Product | null> => {
  try {
    const res = await fetch("http://localhost:5103/api/admin/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("apiPostProduct failed: ", error);
    return null;
  }
};

export const apiGetProductAll = async (): Promise<Product[]> => {
  var res = await fetch("http://localhost:5103/api/admin/products");
  var data = res.json();
  return data;
};
