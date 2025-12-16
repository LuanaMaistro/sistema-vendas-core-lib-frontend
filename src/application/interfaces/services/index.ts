import CustomerService from './customerService'
import ProductService from './productService'

export type { default as CustomerService } from './customerService'
export type { default as ProductService } from './productService'

export const Services = {
  CustomerSerivce: null as unknown as CustomerService,
  ProductService: null as unknown as ProductService
}

type ServicesType = typeof Services

export type AllServices = {
  [K in keyof ServicesType]: ServicesType[K]
}

export type ListServices = keyof AllServices

export type PickServices<K extends ListServices> = Pick<AllServices, K>

export type ServicesFactories = {
  [K in keyof ServicesType]: () => ServicesType[K]
}

