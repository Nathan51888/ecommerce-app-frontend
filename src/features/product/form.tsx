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

export const productAddFormSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(20, "name max length is 20 characters"),
  description: z.string().max(50, "description max length is 50 characters"),
  priceRegular: z
    .number()
    .min(1, "priceRegular is required")
    .nonnegative("priceRegular cannot be a negative number"),
  priceDiscount: z
    .number()
    .nonnegative("priceDiscount cannot be a negative number"),
  stockAmount: z.int().nonnegative("stockAmount cannot be a negative number"),
});

export const productEditFormSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(20, "name max length is 20 characters"),
  description: z.string().max(50, "description max length is 50 characters"),
  priceRegular: z
    .number()
    .min(1, "priceRegular is required")
    .nonnegative("priceRegular cannot be a negative number"),
  priceDiscount: z
    .number()
    .nonnegative("priceDiscount cannot be a negative number"),
  stockAmount: z.int().nonnegative("stockAmount cannot be a negative number"),
});

const AddForm = () => {
  const form = useForm({
    resolver: zodResolver(productAddFormSchema),
    defaultValues: {
      name: "",
      description: "",
      priceRegular: 0,
      priceDiscount: 0,
      stockAmount: 0,
    },
  });

  function onSubmit(data: z.infer<typeof productAddFormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <Dialog>
        <form id="form-add-product" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTrigger
            render={
              <Button variant="outline" className="rounded-lg">
                Add Product
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
                      placeholder="product name"
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
              <Controller
                name="priceRegular"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-price-regular">
                      Price Regular
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-price-regular"
                      aria-invalid={fieldState.invalid}
                      placeholder="123"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="priceDiscount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-price-discount">
                      Price Discount
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-price-discount"
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="stockAmount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-stock-amount">
                      Stock Amount
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-stock-amount"
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter>
              <Button type="submit" form="form-add-product">
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

export default AddForm;
