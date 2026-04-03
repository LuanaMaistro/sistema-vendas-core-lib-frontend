import Product from "../../../domain/entities/product";
import Quantity from "../../../domain/vo/quantity";
import CrudService from "./base/crudService";
import Result from "./base/result";

export default interface ProductService extends CrudService<Product> {
  Activate(productId: string): Promise<Result>
  Deactivate(productId: string): Promise<Result>
  AddStock(productId: string, quantity: Quantity): Promise<Result<Product>>
  RemoveStock(productId: string, quantity: Quantity): Promise<Result<Product>>
  ListProducts(filters: ListProductFilters): Promise<Result<Product[]>>
}

export interface ListProductFilters {
  onlyActives?: boolean
}
