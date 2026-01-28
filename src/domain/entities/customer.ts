import Address from "../vo/address";
import CNPJ from "../vo/cnpj";
import CPF from "../vo/cpf";
import Email from "../vo/email";
import Mobile from "../vo/mobile";
import Phone from "../vo/phone";
import Entity from "./entity";

export interface Customer extends Entity {
  name: string
  Cnpj?: CNPJ
  Cpf?: CPF
  email?: Email
  mobile?: Mobile
  phone?: Phone
  address?: Address
  active?: boolean

  alternativeEmails?: Email[]
  alternativeMobiles?: Mobile[]
  alternativePhones?: Phone[]
  alternativeAddresses?: Address[]
}

export enum CustomerType {
  NATURAL_PERSON = 'NATURAL_PERSON',
  LEGAL_PERSON = 'LEGAL_PERSON'
}
