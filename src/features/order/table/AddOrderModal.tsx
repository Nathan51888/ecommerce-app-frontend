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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v4";
import { actionOrderAdd } from "../actions";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const orderAddFormSchema = z.object({
  orderAddress: z
    .string()
    .min(1, "order address is required")
    .max(50, "order address max length is 50 characters"),
  orderDate: z
    .string()
    .min(1, "order date is required")
    .max(50, "order date max length is 50 characters"),
  orderStatus: z
    .string()
    .min(1, "order status is required")
    .max(20, "status max length is 20 characters"),
});

export const orderEditFormSchema = z.object({
  orderAddress: z
    .string()
    .min(1, "order address is required")
    .max(50, "order address max length is 50 characters"),
  orderDate: z
    .string()
    .min(1, "order date is required")
    .max(50, "order date max length is 50 characters"),
  orderStatus: z
    .string()
    .min(1, "order status is required")
    .max(20, "status max length is 20 characters"),
});

export type OrderAddFormSchema = z.infer<typeof orderAddFormSchema>;

const statusSelect = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Processing",
    value: "processing",
  },
  {
    label: "Shipping",
    value: "shipping",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Failed",
    value: "failed",
  },
  {
    label: "Refunded",
    value: "refunded",
  },
];

const AddOrderModal = () => {
  const form = useForm({
    resolver: zodResolver(orderAddFormSchema),
    defaultValues: {
      orderAddress: "",
      orderDate: "",
      orderStatus: "",
    },
  });
  const [open, setOpen] = useState(false);

  async function onSubmit(data: OrderAddFormSchema) {
    console.log("AddOrderModal onSubmit formData: ", data);
    const res = await actionOrderAdd(data);
    console.log("AddOrderModal onSubmit action res: ", res);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <form id="form-add-order" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTrigger
            render={
              <Button variant="default" className="rounded-lg">
                Add Order
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Order</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Controller
                name="orderAddress"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Order Address</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="order address"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="orderDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="order date"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="orderStatus"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Order Status</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {statusSelect.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                form="form-add-order"
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

export default AddOrderModal;
