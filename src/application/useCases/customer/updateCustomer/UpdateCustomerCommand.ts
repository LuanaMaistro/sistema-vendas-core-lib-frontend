export default interface UpdateCustomerCommand {
  id: string
  name?: string
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
