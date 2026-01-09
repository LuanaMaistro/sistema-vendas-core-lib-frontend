import { CustomerType } from './domain'

export { default as createApplicationInstance } from './main'

export type { Customer, CustomerContact  } from './domain/entities/customer'
export { CustomerType }
export type { default as Product } from './domain/entities/product'
export type { default as Entity } from './domain/entities/entity'


export { default as CPF } from './domain/vo/cpf'
export { default as CNPJ } from './domain/vo/cnpj'
export { default as Name } from './domain/vo/name'

export { default as ValueObjectError } from './domain/errors/valueObjectError'

export type { UseCaseInstances } from './application/types'

export type { default as CustomerService } from './application/interfaces/services/customerService'
export type { default as ProductService } from './application/interfaces/services/productService'
export type { default as CrudService } from './application/interfaces/services/base/crudService'
export type { default as Result } from './application/interfaces/services/base/result'

export type {
  ServicesFactories,
  ListServices,
  AllServices,
  PickServices
} from './application/interfaces/services'

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

