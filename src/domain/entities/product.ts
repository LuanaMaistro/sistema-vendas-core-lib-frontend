import Entity from "./entity";
import Price from "../vo/price";
import Quantity from "../vo/quantity";

export default interface Product extends Entity {
  name: string;
  description: string;
  code: string;
  price: Price;
  quantity: Quantity;
  minimumQuantity: Quantity;
  active: boolean;
  nivelEstoque: number;
}

