import Entity from "./entity";
export default interface Product extends Entity {
  name: string;
  description: string;
  code: string;
}

