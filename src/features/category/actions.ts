"use server";

import { revalidatePath } from "next/cache";
import { CategoryAddFormSchema } from "./table/AddCategoryModal";
import { apiPostCategory } from "./api";

export const actionCategoryAdd = async (
  data: CategoryAddFormSchema,
): Promise<any> => {
  try {
    const res = await apiPostCategory(data);
    revalidatePath("/admin/products/categories");
  } catch (error) {
    console.log(error);
  }
};
