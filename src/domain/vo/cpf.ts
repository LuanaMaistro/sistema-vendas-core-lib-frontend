import ValueObjetctError from "../errors/valueObjectError"

export default class CPF {
  private constructor(private value: string) {}

  get Value() {
    return this.value;
  }

  static create(cpf: string) {
    if (!this.cpfInputIsValid(cpf)) throw new ValueObjetctError("cpf invalido");

    return new CPF(cpf);
  }

  private static cpfInputIsValid(aCpf: string): boolean {
    const cleanedCpf = this.cleanInput(aCpf);

    if (cleanedCpf.length != 11) return false;

    const allDigitsAreEqual = /^(\d)\1{10}$/.test(cleanedCpf);
    if (allDigitsAreEqual) return false;

    const digits = cleanedCpf.split("").map(Number);

    const weights1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const digit1 = this.calculateDigit(digits.slice(0, 9), weights1);

    if (digit1 !== digits[9]) {
      return false;
    }

    const weights2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const digit2 = this.calculateDigit(digits.slice(0, 10), weights2);

    return digit2 === digits[10];
  }

  private static cleanInput(aCpf: string): string {
    return aCpf.replace(/\D/g, "");
  }

  private static calculateDigit(digits: number[], weights: number[]): number {
    const sum = digits.reduce((acc, digit, index) => {
      return acc + digit * weights[index];
    }, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }
}
