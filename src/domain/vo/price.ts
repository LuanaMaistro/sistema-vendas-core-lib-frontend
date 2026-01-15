import ValueObjectError from "../errors/valueObjectError"

export default class Price {
  private constructor(private value: number) {}

  get Value() {
    return this.value;
  }

  static create(price: number | string): Price {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (!this.isValid(numericPrice)) {
      throw new ValueObjectError("Preço inválido");
    }

    return new Price(numericPrice);
  }

  private static isValid(price: number): boolean {
    if (price === null) return false;
    if (isNaN(price)) return false;
    if (price < 0) return false;
    if (!isFinite(price)) return false;
    return true;
  }
}
