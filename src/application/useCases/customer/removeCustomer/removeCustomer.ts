import { ListServices, PickServices } from "../../../interfaces/services";
import ProductService from "../../../interfaces/services/productService";
import UseCase from "../../base/abstractUseCase";

export default class RemoveCustomer extends UseCase {

  static inject: Array<ListServices> = ['ProductService'] as const
  private productServices: ProductService

  constructor(services: PickServices<'ProductService'>) {
    super()
    this.productServices = services.ProductService
  }

  async execute(customerId: string) {
    this.productServices
    console.log('removendo cliente: ',customerId)
  }
}

