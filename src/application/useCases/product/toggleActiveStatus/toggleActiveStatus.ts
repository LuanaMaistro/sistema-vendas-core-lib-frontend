import { left } from "../../../either";
import { ListServices, PickServices } from "../../../interfaces/services";
import ProductService from "../../../interfaces/services/productService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import ToggleActiveStatusCommand from "./ToggleActiveStatusCommand";

export default class ToggleProductActiveStatusUseCase extends UseCase {
  static inject: Array<ListServices> = ['ProductService'] as const

  private readonly productService: ProductService

  constructor(services: PickServices<'ProductService'>) {
    super()
    this.productService = services.ProductService
  }

  async execute(command: ToggleActiveStatusCommand): Promise<OperationResult> {
    const product = command.product

    if (!product?.id) return left(new Error("ID é obrigatório"))

    if (product.active)
      return await this.toOperationResult(await this.productService.Deactivate(product.id))

    return await this.toOperationResult(await this.productService.Activate(product.id))
  }
}
