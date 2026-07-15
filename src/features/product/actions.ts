"use server";

import { revalidatePath } from "next/cache";
import { apiPostProduct } from "./api";
import { ProductAddFormSchema } from "./table/AddProductModal";

export const actionProductAdd = async (product: ProductAddFormSchema) => {
  try {
    const data = await apiPostProduct(product);
    revalidatePath("/admin/products");
  } catch (error) {
    console.log("actionProductAdd failed: ", error);
  }
};
