"use server";

import { CategoryAddFormSchema } from "./table/AddCategoryModal";
import { Category } from "./types";

export const apiPostCategory = async (
  category: CategoryAddFormSchema,
): Promise<Category | null> => {
  try {
    const res = await fetch("http://localhost:5103/api/admin/categories", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const apiGetCategoryAll = async (): Promise<Category[]> => {
  var res = await fetch("http://localhost:5103/api/admin/categories");
  var data = res.json();
  return data;
};
