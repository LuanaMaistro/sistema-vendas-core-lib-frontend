import {Customer} from "../../../../domain/entities/customer";
import { left } from "../../../either/either";
import { ListServices, PickServices } from "../../../interfaces/services";
import CustomerService from "../../../interfaces/services/customerService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import GetCustomerByIdCommand from "./GetCustomerByIdCommand";

export default class GetCustomerByIdUseCase extends UseCase {

  static inject: Array<ListServices> = ['CustomerSerivce'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerSerivce'>) {
    super()
    this.customerServices = services.CustomerSerivce
  }

  async execute(command: GetCustomerByIdCommand): Promise<OperationResult<Customer>> {
    if(!command.id) return left(new Error("ID é obrigatório"))

    return this.toOperationResult<Customer>(this.customerServices.GetById(command.id))
  }
}
