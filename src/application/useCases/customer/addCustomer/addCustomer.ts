import { Either, right } from "@/application/either"
import CPF from "../../../../domain/vo/cpf"
export default class AddCustomer {

  constructor(
  ){}

  async addCpf(name: string, cpf: string): Promise<Either<Error, undefined>> {

    const newCustomer = {
      Cpf: CPF.create(cpf),
      name: name
    }

    console.log(newCustomer)

    return right(undefined)
  }

}
