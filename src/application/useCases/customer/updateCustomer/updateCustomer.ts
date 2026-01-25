import {Customer} from "../../../../domain/entities/customer";
import Address from "../../../../domain/vo/address";
import { left } from "../../../either/either";
import { ListServices, PickServices } from "../../../interfaces/services";
import CustomerService from "../../../interfaces/services/customerService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import UpdateCustomerCommand from "./UpdateCustomerCommand";

export default class UpdateCustomerUseCase extends UseCase {

  static inject: Array<ListServices> = ['CustomerService'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerService'>) {
    super()
    this.customerServices = services.CustomerService
  }

  async execute(command: UpdateCustomerCommand): Promise<OperationResult> {
    if(!command.id) return left(new Error("ID é obrigatório"))

    const customer = this.buildCustomerUpdate(command)
    return await this.toOperationResult(await this.customerServices.Update(customer))
  }

  private buildCustomerUpdate(command: UpdateCustomerCommand): Customer {
    const result = { id: command.id } as Customer

    if(command.name) result.name = command.name
    if(command.address) result.address = this.toAddress(command.address)

    return result
  }

  private toAddress(address: UpdateCustomerCommand['address']) {
    return Address.create(
      address!.street,
      address!.number,
      address!.complement,
      address!.neighborhood,
      address!.city,
      address!.state,
      address!.zipCode,
    )
  }
}
