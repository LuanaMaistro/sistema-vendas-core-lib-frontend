import CNPJ from "../vo/cnpj";
import CPF from "../vo/cpf";
import Entity from "./entity";

export default interface Customer extends Entity {
  name: string
  Cnpj?: CNPJ
  Cpf?: CPF
  CustomerContact?: CustomerContact
}

export interface CustomerContact {
  email: string,
  phone: string,
}

