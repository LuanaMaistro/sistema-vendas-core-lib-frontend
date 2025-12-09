import CPF from "../../../../domain/vo/cpf"
import { right } from "../../../either"
import CustomerService from "../../../interfaces/services/customerService"
import { OperationResult } from "../../base/OperationResult"
export default class AddCustomer {

  constructor(
    private readonly customerServices: CustomerService
  ){}

  async addCpf(name: string, cpf: string): Promise<OperationResult> {

    const newCustomer = {
      Cpf: CPF.create(cpf),
      name: name
    }

    this.customerServices.Add(newCustomer)

    return right(undefined)
  }

}
