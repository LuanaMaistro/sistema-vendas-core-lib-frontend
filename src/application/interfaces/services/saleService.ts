import { PaymentMethod, Sale, SaleItem, SaleStatus } from "../../../domain";
import { CrudService, Result } from "./base";

export default interface SaleService extends CrudService<Sale> {
  ListSales(filters: ListSaleFilters): Promise<Result<Array<Sale>>>
  ConfirmSale(saleId: string, paymentMethod: PaymentMethod): Promise<Result<Sale>>
  CancelSale(saleId: string): Promise<Result<Sale>>
  AddItem(saleId: string, item: SaleItem): Promise<Result<Sale>>
  RemoveItem(saleId: string, itemId: string): Promise<Result<Sale>>
  UpdateItemQuantity(saleId: string, itemId: string, quantity: number): Promise<Result<Sale>>
}

export interface ListSaleFilters {
  customerId?: string
  status?: SaleStatus
  startDate?: string
  endDate?: string
}
