import Product from "../../../../domain/entities/product";
import { left } from "../../../either/either";
import { ListServices, PickServices } from "../../../interfaces/services";
import ProductService from "../../../interfaces/services/productService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import GetProductByIdCommand from "./GetProductByIdCommand";

export default class GetProductByIdUseCase extends UseCase {
  static inject: Array<ListServices> = ['ProductService'] as const

  private readonly productService: ProductService

  constructor(services: PickServices<'ProductService'>) {
    super()
    this.productService = services.ProductService
  }

  async execute(command: GetProductByIdCommand): Promise<OperationResult<Product>> {
    if (!command.id) return left(new Error("ID é obrigatório"));

    return this.toOperationResult<Product>(this.productService.GetById(command.id));
  }
}
