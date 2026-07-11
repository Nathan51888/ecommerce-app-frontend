export type Order = {
  id: string;
  orderAddress: string;
  orderDate: string;
  orderStatus:
    "pending" | "processing" | "shipping" | "delivered" | "refunded" | "failed";
};
