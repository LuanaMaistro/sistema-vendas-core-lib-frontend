import { ValueObjectError } from "../..";

export default class Email {
  private constructor(private value: string) {}

  get Value() {
    return this.value;
  }

  get Normalized() {
    return this.value.trim().toUpperCase();
  }

  static create(email: string): Email {
    if (!this.isValid(email)) throw new ValueObjectError("Email inválido");

    return new Email(email);
  }

  public static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
