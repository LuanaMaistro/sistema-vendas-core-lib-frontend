import { CustomerType, SaleItem, SaleStatus, Sale, PaymentMethod  } from './domain'

export { default as createApplicationInstance } from './main'

export type { Customer } from './domain/entities/customer'
export type { SaleItem, Sale }
export { CustomerType, SaleStatus, PaymentMethod }
export type { default as Product } from './domain/entities/product'
export type { default as Entity } from './domain/entities/entity'


export { default as CPF } from './domain/vo/cpf'
export { default as CNPJ } from './domain/vo/cnpj'
export { default as Name } from './domain/vo/name'
export { default as Quantity } from './domain/vo/quantity'
export { default as Price } from './domain/vo/price'
export { default as Email } from './domain/vo/email'
export { default as Mobile } from './domain/vo/mobile'
export { default as Phone } from './domain/vo/phone'
export { default as Address } from './domain/vo/address'

export { default as ValueObjectError } from './domain/errors/valueObjectError'

export type { UseCaseInstances } from './application/types'

export type { default as CustomerService } from './application/interfaces/services/customerService'
export type { default as ProductService } from './application/interfaces/services/productService'
export type { default as SaleService } from './application/interfaces/services/saleService'
export type { default as CrudService } from './application/interfaces/services/base/crudService'
export type { default as Result } from './application/interfaces/services/base/result'

export type {
  ServicesFactories,
  ListServices,
  AllServices,
  PickServices
} from './application/interfaces/services'

import { ListCustomerFilters } from './application/interfaces/services/customerService'
export { type ListCustomerFilters }

import { ListSaleFilters } from './application/interfaces/services/saleService'
export { type ListSaleFilters }

export type { Either } from './application/either/either'
export {
  left,
  right,
  isLeft,
  isRight,
  fold,
  map
} from './application/either/either'

export * as UseCasesBase from './application/useCases/base'
import { OperationError, OperationResult } from './application/useCases/base'
export {OperationError}
export { type OperationResult }

