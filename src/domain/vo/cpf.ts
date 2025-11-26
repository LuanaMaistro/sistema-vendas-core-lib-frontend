import ValueObjetctError from "../errors/valueObjectError"

export default class CPF {

  private constructor (private value: string){}

  get Value() {
    return this.value
  }

  static create(cpf: string){

    if(cpf.length != 11)
      throw new ValueObjetctError("cpf invalido")

    return new CPF(cpf)
  }
}
