import ValueObjetctError from "../errors/valueObjectError"

export default class CNPJ {
  private constructor(private value: string){}
  get Value(){
    return this.value
  }

  static create(cnpj: string) {

    if(cnpj.length != 14)
      throw new ValueObjetctError("cnpj invalido")

    return new CNPJ(cnpj)
  }
}
