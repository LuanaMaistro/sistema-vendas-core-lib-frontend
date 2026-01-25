import {Customer} from "../../../../domain/entities/customer"
import Address from "../../../../domain/vo/address"
import CNPJ from "../../../../domain/vo/cnpj"
import CPF from "../../../../domain/vo/cpf"
import Email from "../../../../domain/vo/email"
import Mobile from "../../../../domain/vo/mobile"
import Phone from "../../../../domain/vo/phone"
import { left } from "../../../either"
import { ListServices, PickServices } from "../../../interfaces/services"
import CustomerService from "../../../interfaces/services/customerService"
import UseCase from "../../base/abstractUseCase"
import { OperationResult } from "../../base/OperationResult"
import AddCustomerCommand from "./AddCustomerDto"

export default class AddCustomerUseCase extends UseCase{

  static inject: Array<ListServices> = ['CustomerService'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerService'>){
    super()
    this.customerServices = services.CustomerService

  }

  async execute(command: AddCustomerCommand): Promise<OperationResult> {
    if(!command.cpf && !command.cnpj) left(new Error("É necessário pelo menos um documento"))

    const customer = this.toCustomer(command)
    return await this.toOperationResult(await this.customerServices.Add(customer))
  }

  private toCustomer(command: AddCustomerCommand): Customer {
    const result = {
      name: command.name,
    } as Customer

    if(command.email) result.email = Email.create(command.email)
    if(command.phone) result.phone = Phone.create(command.phone)
    if(command.mobile) result.mobile = Mobile.create(command.mobile)
    if(command.address) result.address = this.convertToAddress(command.address)

    if(command.cpf) result.Cpf = CPF.create(command.cpf)
    else result.Cnpj = CNPJ.create(command.cnpj!)

    return result
  }

  private convertToAddress(address: AddCustomerCommand["address"]) {
    return Address.create(address!.street,
      address!.number,
      address?.complement,
      address!.neighborhood,
      address!.city,
      address!.state,
      address!.zipCode)
  }

}

