import { ValueObjectError } from "../..";

export default class Phone {
  private constructor(private value: string) {}

  get Value() {
    return this.value;
  }

  static create(phone: string): Phone {
    const cleanedPhone = phone.replace(/\D/g, '');

    if (!this.isValid(cleanedPhone))
      throw new ValueObjectError("Telefone inválido");

    return new Phone(phone);
  }

  public static isValid(phone: string): boolean {
    const phoneRegex = /^(?:\+?55)?([1-9]{2})[2-5]\d{7}$/;
    return phoneRegex.test(phone);
  }
}
