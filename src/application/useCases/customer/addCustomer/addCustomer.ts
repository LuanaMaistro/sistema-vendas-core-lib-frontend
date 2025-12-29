import {Customer} from "../../../../domain/entities/customer"
import CNPJ from "../../../../domain/vo/cnpj"
import CPF from "../../../../domain/vo/cpf"
import { left } from "../../../either"
import { ListServices, PickServices } from "../../../interfaces/services"
import CustomerService from "../../../interfaces/services/customerService"
import UseCase from "../../base/abstractUseCase"
import { OperationResult } from "../../base/OperationResult"
import AddCustomerCommand from "./AddCustomerDto"

export default class AddCustomerUseCase extends UseCase{

  static inject: Array<ListServices> = ['CustomerSerivce'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerSerivce'>){
    super()
    this.customerServices = services.CustomerSerivce

  }

  async execute(command: AddCustomerCommand): Promise<OperationResult> {
    if(!command.cpf && !command.cnpj) left(new Error("É necessário pelo menos um documento"))

    const customer = this.createCustomer(command)
    return this.toOperationResult(this.customerServices.Add(customer))
  }

  private createCustomer(command: AddCustomerCommand): Customer {
    const result = {
      name: command.name,
      CustomerContact: {
        email: command.email,
        phone: command.phone,
      }
    } as Customer


    if(command.cpf) result.Cpf = CPF.create(command.cpf)
      else result.Cnpj = CNPJ.create(command.cnpj!)

    return result
  }

}

