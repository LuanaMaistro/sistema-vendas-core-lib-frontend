import { ValueObjectError } from "../..";

export default class Mobile {
  private constructor(private value: string) {}

  get Value() {
    return this.value;
  }

  get Normalized() {
    return this.value.replace(/\D/g, '');
  }

  static create(mobile: string): Mobile {
    const mobileCleaned = mobile.replace(/\D/g, '')

    if (!this.isValid(mobileCleaned))
      throw new ValueObjectError("Número de celular inválido");

    return new Mobile(mobile);
  }

  public static isValid(mobile: string): boolean {
    const normalized = mobile.replace(/\D/g, '')
    const mobileRegex = /^(?:\+?55)?([1-9]{2})9\d{8}$/
    return mobileRegex.test(normalized)
  }
}
