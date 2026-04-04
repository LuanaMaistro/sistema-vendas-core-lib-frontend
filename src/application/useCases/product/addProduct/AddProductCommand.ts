export default interface AddProductCommand {
  name: string;
  description: string;
  code: string;
  price: number | string;
  quantity: number | string;
  category?: string;
  minimumQuantity: number | string;
}
