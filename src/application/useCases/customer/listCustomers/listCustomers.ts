import { Customer } from "../../../../domain/entities/customer";
import { ListServices, PickServices } from "../../../interfaces/services";
import CustomerService from "../../../interfaces/services/customerService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";

export default class ListCustomersUseCase extends UseCase {

  static inject: Array<ListServices> = ['CustomerService'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerService'>) {
    super()
    this.customerServices = services.CustomerService
  }

  async execute(): Promise<OperationResult<Array<Customer>>> {
    const serviceResult = await this.customerServices.List()
    return await this.toOperationResult(serviceResult)
  }
}
