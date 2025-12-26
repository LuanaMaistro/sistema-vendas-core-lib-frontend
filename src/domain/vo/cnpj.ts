import ValueObjetctError from "../errors/valueObjectError"

export default class CNPJ {
  private constructor(private value: string){}
  get Value(){
    return this.value
  }

  static create(cnpj: string) {

    if(this.cnpjIsValid(cnpj))
      throw new ValueObjetctError("cnpj invalido")

    return new CNPJ(cnpj)
  }

  private static cnpjIsValid(aCnpj: string): boolean {
    const cleanedCnpj = this.cleanInput(aCnpj)

    if(cleanedCnpj.length != 14) return false

    const allDigitsAreEqual = /^(\d)\1{10}$/.test(cleanedCnpj);
    if (allDigitsAreEqual) return false;

    const digits = cleanedCnpj.split('').map(Number);
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const digit1 = this.calculateDigit(digits.slice(0, 12), weights1);

    if (digit1 !== digits[12]) {
      return false;
    }
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const digit2 = this.calculateDigit(digits.slice(0, 13), weights2);

    return digit2 === digits[13];

  }
  private static cleanInput(aCnpj: string) {
    return aCnpj.replace(/D/g, '')
  }

  private static calculateDigit(digits: number[], weights: number[]): number {
    const sum = digits.reduce((acc, digit, index) => {
      return acc + digit * weights[index];
    }, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

}
