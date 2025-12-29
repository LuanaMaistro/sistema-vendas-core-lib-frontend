import { left } from "../../../either/either";
import { ListServices, PickServices } from "../../../interfaces/services";
import CustomerService from "../../../interfaces/services/customerService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import RemoveCustomerCommand from "./RemoveCustomerCommand";

export default class RemoveCustomerUseCase extends UseCase {

  static inject: Array<ListServices> = ['CustomerService'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerService'>) {
    super()
    this.customerServices = services.CustomerService
  }

  async execute(command: RemoveCustomerCommand): Promise<OperationResult> {
    if(!command.id) return left(new Error("ID é obrigatório"))

    return this.toOperationResult(this.customerServices.Remove(command.id))
  }
}

