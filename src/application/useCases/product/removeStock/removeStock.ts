import Product from "../../../../domain/entities/product";
import Quantity from "../../../../domain/vo/quantity";
import { left } from "../../../either";
import { ListServices, PickServices } from "../../../interfaces/services";
import ProductService from "../../../interfaces/services/productService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import RemoveStockCommand from "./RemoveStockCommand";

export default class RemoveStockUseCase extends UseCase {
  static inject: Array<ListServices> = ['ProductService'] as const

  private readonly productService: ProductService

  constructor(services: PickServices<'ProductService'>) {
    super()
    this.productService = services.ProductService
  }

  async execute(command: RemoveStockCommand): Promise<OperationResult<Product>> {
    if (!command.id) return left(new Error("ID é obrigatório"))
    if (!Quantity.isValid(command.quantity)) return left(new Error("Quantidade inválida"))

    return this.toOperationResult(
      await this.productService.RemoveStock(command.id, Quantity.create(command.quantity))
    )
  }
}
