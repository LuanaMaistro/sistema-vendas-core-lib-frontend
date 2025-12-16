import CPF from "../../../../domain/vo/cpf"
import { ListServices, PickServices } from "../../../interfaces/services"
import CustomerService from "../../../interfaces/services/customerService"
import UseCase from "../../base/abstractUseCase"
import { OperationResult } from "../../base/OperationResult"

export default class AddCustomer extends UseCase{

  static inject: Array<ListServices> = ['CustomerSerivce'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerSerivce'>){
    super()
    this.customerServices = services.CustomerSerivce

  }

  async addCpf(name: string, cpf: string): Promise<OperationResult> {

    const newCustomer = {
      Cpf: CPF.create(cpf),
      name: name
    }

    return this.toOperationResult(this.customerServices.Add(newCustomer))
  }

}

