import Product from "../../../../domain/entities/product";
import { ListServices, PickServices } from "../../../interfaces/services";
import ProductService from "../../../interfaces/services/productService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";

export default class ListProductsUseCase extends UseCase {
  static inject: Array<ListServices> = ['ProductService'] as const

  private readonly productService: ProductService

  constructor(services: PickServices<'ProductService'>) {
    super()
    this.productService = services.ProductService
  }

  async execute(): Promise<OperationResult<Array<Product>>> {
    const serviceResult = await this.productService.List()
    return this.toOperationResult(serviceResult);
  }
}
