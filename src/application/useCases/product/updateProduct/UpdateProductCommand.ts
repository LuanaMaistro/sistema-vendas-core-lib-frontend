export default interface UpdateProductCommand {
  id: string;
  name?: string;
  description?: string;
  price?: number | string;
  minimumQuantity?: number | string;
}
