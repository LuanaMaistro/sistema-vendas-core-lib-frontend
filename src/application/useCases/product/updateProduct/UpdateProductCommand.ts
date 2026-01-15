export default interface UpdateProductCommand {
  id: string;
  name?: string;
  description?: string;
  price?: number | string;
  quantity?: number | string;
}
