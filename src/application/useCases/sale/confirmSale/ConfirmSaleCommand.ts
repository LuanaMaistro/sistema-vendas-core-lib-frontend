import { PaymentMethod } from "../../../../domain";

export default interface ConfirmSaleCommand {
  saleId: string
  paymentMethod: PaymentMethod
}
