import ValueObjectError from "../errors/valueObjectError"

export default class Quantity {
  private constructor(private value: number) {}

  get Value() {
    return this.value;
  }

  static create(quantity: number | string): Quantity {
    const numericQuantity = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;

    if (!this.isValid(numericQuantity)) {
      throw new ValueObjectError("Quantidade inválida");
    }

    return new Quantity(numericQuantity);
  }

  public static isValid(quantity: number | string): boolean {
    const numericQuantity = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;

    if (numericQuantity === null) return false;
    if (isNaN(numericQuantity)) return false;
    if (numericQuantity < 0) return false;
    if (!Number.isInteger(numericQuantity)) return false;

    return true;
  }
}
