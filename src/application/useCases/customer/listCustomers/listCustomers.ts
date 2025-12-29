import { Customer } from "../../../../domain/entities/customer";
import { ListServices, PickServices } from "../../../interfaces/services";
import CustomerService from "../../../interfaces/services/customerService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";

export default class ListCustomersUseCase extends UseCase {

  static inject: Array<ListServices> = ['CustomerSerivce'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerSerivce'>) {
    super()
    this.customerServices = services.CustomerSerivce
  }

  async execute(): Promise<OperationResult<Array<Customer>>> {
    return this.toOperationResult(this.customerServices.List())
  }
}
