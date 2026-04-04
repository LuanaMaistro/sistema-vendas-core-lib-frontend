export default interface UpdateProductCommand {
  id: string;
  name?: string;
  description?: string;
  price?: number | string;
  category?: string;
  minimumQuantity?: number | string;
}
