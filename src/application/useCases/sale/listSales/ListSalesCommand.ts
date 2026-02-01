import { SaleStatus } from "../../../../domain";

export default interface ListSalesCommand {
  customerId?: string
  status?: SaleStatus
  startDate?: string
  endDate?: string
}
