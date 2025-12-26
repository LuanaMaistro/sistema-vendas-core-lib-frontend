import Customer from "../../../../domain/entities/customer"
import CPF from "../../../../domain/vo/cpf"
import { ListServices, PickServices } from "../../../interfaces/services"
import CustomerService from "../../../interfaces/services/customerService"
import UseCase from "../../base/abstractUseCase"
import { OperationResult } from "../../base/OperationResult"
import AddCpfCustomerDto from "./addCpfCustomerDto"

export default class AddCustomer extends UseCase{

  static inject: Array<ListServices> = ['CustomerSerivce'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerSerivce'>){
    super()
    this.customerServices = services.CustomerSerivce

  }

  async addCpf(aCpfCustomer: AddCpfCustomerDto): Promise<OperationResult> {

    const newCustomer = {
      Cpf: CPF.create(aCpfCustomer.cpf),
      name: aCpfCustomer.name,
      CustomerContact: {
        email: aCpfCustomer.email,
        phone: aCpfCustomer.phone,
      }
    } as Customer

    return this.toOperationResult(this.customerServices.Add(newCustomer))
  }

}

