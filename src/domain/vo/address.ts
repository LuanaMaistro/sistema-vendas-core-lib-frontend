export default class Address {
  private constructor(
    public readonly street: string,
    public readonly number: string,
    public readonly complement: string,
    public readonly neighborhood: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string,
  ) {}

  get ZipCode(): string {
    return `${this.zipCode.substring(0, 5)}-${this.zipCode.substring(5, 8)}`;
  }

  get FullAddress(): string {
    const complementPart = this.complement ? `, ${this.complement}` : '';
    return `${this.street}, ${this.number} ${complementPart} - ${this.neighborhood}, ${this.city} - ${this.state}, ${this.ZipCode}`;
  }

  static create(
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
  ): Address {
    return new Address(
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
    );
  }

}
