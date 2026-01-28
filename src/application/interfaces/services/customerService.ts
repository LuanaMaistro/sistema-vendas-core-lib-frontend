import {Customer} from "../../../domain/entities/customer"
import { Result } from "./base";
import CrudService from "./base/crudService";


export default interface CustomerService extends CrudService<Customer> {
  ListCustomers(filters: ListCustomerFilters): Promise<Result<Array<Customer>>>
}

export interface ListCustomerFilters {
  onlyActives?: boolean
}

