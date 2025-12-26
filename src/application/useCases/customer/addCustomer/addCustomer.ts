import Customer from "../../../../domain/entities/customer"
import CNPJ from "../../../../domain/vo/cnpj"
import CPF from "../../../../domain/vo/cpf"
import { ListServices, PickServices } from "../../../interfaces/services"
import CustomerService from "../../../interfaces/services/customerService"
import UseCase from "../../base/abstractUseCase"
import { OperationResult } from "../../base/OperationResult"
import AddCnpjCustomerDto from "./addCnpjCustomerDto"
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

  async addCnpj(aCpfCustomer: AddCnpjCustomerDto): Promise<OperationResult> {

    const newCustomer = {
      Cnpj: CNPJ.create(aCpfCustomer.cnpj),
      name: aCpfCustomer.name,
      CustomerContact: {
        email: aCpfCustomer.email,
        phone: aCpfCustomer.phone,
      }
    } as Customer

    return this.toOperationResult(this.customerServices.Add(newCustomer))
  }
}

