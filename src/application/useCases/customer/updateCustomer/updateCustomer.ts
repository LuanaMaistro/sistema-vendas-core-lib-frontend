import Customer from "../../../../domain/entities/customer";
import CNPJ from "../../../../domain/vo/cnpj";
import CPF from "../../../../domain/vo/cpf";
import { left } from "../../../either/either";
import { ListServices, PickServices } from "../../../interfaces/services";
import CustomerService from "../../../interfaces/services/customerService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import UpdateCustomerCommand from "./UpdateCustomerCommand";

export default class UpdateCustomerUseCase extends UseCase {

  static inject: Array<ListServices> = ['CustomerSerivce'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerSerivce'>) {
    super()
    this.customerServices = services.CustomerSerivce
  }

  async execute(command: UpdateCustomerCommand): Promise<OperationResult> {
    if(!command.id) return left(new Error("ID é obrigatório"))

    if(command.cpf && command.cnpj) return left(new Error("Não é possível fornecer CPF e CNPJ ao mesmo tempo"))

    const customer = this.buildCustomerUpdate(command)
    return this.toOperationResult(this.customerServices.Update(customer))
  }

  private buildCustomerUpdate(command: UpdateCustomerCommand): Customer {
    const result = { id: command.id } as Customer

    //TODO: trocar para VO de name
    if(command.name) result.name = command.name

    if(command.cpf) result.Cpf = CPF.create(command.cpf)
    else if(command.cnpj) result.Cnpj = CNPJ.create(command.cnpj)

    result.CustomerContact = {
      email: command.email || '',
      phone: command.phone || ''
    }

    return result
  }
}
