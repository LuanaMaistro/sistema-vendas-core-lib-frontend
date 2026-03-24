import {Customer} from "../../../domain/entities/customer"
import Recommendation from "../../../domain/entities/recommendation"
import { Result } from "./base";
import CrudService from "./base/crudService";


export default interface CustomerService extends CrudService<Customer> {
  ListCustomers(filters: ListCustomerFilters): Promise<Result<Array<Customer>>>
  ToogleActiveStatus(customer: Customer): Promise<Result>
  GetRecommendations(customerId: string, quantidade?: number): Promise<Result<Array<Recommendation>>>
}

export interface ListCustomerFilters {
  onlyActives?: boolean
}

