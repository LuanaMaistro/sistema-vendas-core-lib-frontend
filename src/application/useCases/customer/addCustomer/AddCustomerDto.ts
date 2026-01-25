export default interface AddCustomerCommand {
  name?: string,
  cpf?: string,
  cnpj?: string,
  email?: string,
  phone?: string,
  mobile?: string,
  address?: {
    street: string,
    number: string,
    complement?: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
  }
}
