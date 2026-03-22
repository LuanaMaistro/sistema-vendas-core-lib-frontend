import Product from "../../../domain/entities/product";
import CrudService from "./base/crudService";
import Result from "./base/result";

export default interface ProductService extends CrudService<Product> {
  Activate(id: string): Promise<Result>
  Deactivate(id: string): Promise<Result>
}
