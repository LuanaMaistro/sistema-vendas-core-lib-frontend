import { Customer, PaymentMethod } from "../../../../domain";

export default interface CreateSaleCommand {
  customer: Customer;
  items: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod
  observations?: string;
}

