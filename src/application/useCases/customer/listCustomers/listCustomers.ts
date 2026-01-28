import { Customer } from "../../../../domain/entities/customer";
import { ListServices, PickServices } from "../../../interfaces/services";
import CustomerService from "../../../interfaces/services/customerService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import ListCustomersCommand from "./ListCustomersCommand";

export default class ListCustomersUseCase extends UseCase {

  static inject: Array<ListServices> = ['CustomerService'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerService'>) {
    super()
    this.customerServices = services.CustomerService
  }

  async execute(filters?: ListCustomersCommand): Promise<OperationResult<Array<Customer>>> {
    if(!filters)
      return await this.toOperationResult(await this.customerServices.List())

    const serviceResult = await this.customerServices.ListCustomers({
      onlyInactive: filters.onlyInactive
    })
    return await this.toOperationResult(serviceResult)
  }
}

