"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v4";
import { actionCategoryAdd } from "../actions";
import { useState } from "react";

export const categoryAddFormSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(20, "name max length is 20 characters"),
  description: z.string().max(50, "description max length is 50 characters"),
});

export const categoryEditFormSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(20, "name max length is 20 characters"),
  description: z.string().max(50, "description max length is 50 characters"),
});

export type CategoryAddFormSchema = z.infer<typeof categoryAddFormSchema>;

const AddCategoryModal = () => {
  const form = useForm({
    resolver: zodResolver(categoryAddFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [open, setOpen] = useState(false);

  async function onSubmit(data: CategoryAddFormSchema) {
    const res = await actionCategoryAdd(data);
    console.log(data);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <form id="form-add-category" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTrigger
            render={
              <Button variant="default" className="rounded-lg">
                Add Category
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="category name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="description"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter>
              <Button
                type="submit"
                form="form-add-category"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Submit
              </Button>
              <DialogClose
                render={
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                }
              />
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddCategoryModal;
