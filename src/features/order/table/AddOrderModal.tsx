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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";

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
  const [date, setDate] = useState<Date>();

  async function onSubmit(formData: OrderAddFormSchema) {
    try {
      console.log("AddOrderModal onSubmit formData: ", formData);
      const res = await actionOrderAdd(formData);
      setOpen(false);
      form.reset();
      console.log("AddOrderModal onSubmit action result: ", res);
    } catch (error) {
      console.error("AddOrderModal onSubmit error: ", error);
    }
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
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            variant="outline"
                            data-empty={!date}
                            className="data-[empty=true]:text-muted-foreground flex justify-between text-left font-normal"
                          >
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <ChevronDownIcon data-icon="inline-end" />
                          </Button>
                        }
                      ></PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          defaultMonth={date}
                        />
                      </PopoverContent>
                    </Popover>
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
              <Button type="submit" form="form-add-order">
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
