import Entity from "./entity";

export interface Sale extends Entity {
  customerId: string;
  date?: Date;
  items: SaleItem[];
  totalAmount?: number;
  status: SaleStatus;
  paymentMethod?: PaymentMethod;
  observations?: string;
}

export interface SaleItem extends Entity {
  saleId?: string;
  productId?: string;
  productName?: string;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
}

export enum SaleStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  BANK_TRANSFER = 'BANK_TRANSFER',
  TICKET = 'TICKET',
}

