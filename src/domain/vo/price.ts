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

  public static isValid(price: number | string): boolean {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (numericPrice === null) return false;
    if (isNaN(numericPrice)) return false;
    if (numericPrice < 0) return false;
    if (!isFinite(numericPrice)) return false;
    return true;
  }
}
