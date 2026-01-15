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

  private static isValid(quantity: number): boolean {
    if (isNaN(quantity)) return false;
    if (quantity < 0) return false;
    if (!Number.isInteger(quantity)) return false;
    return true;
  }
}
