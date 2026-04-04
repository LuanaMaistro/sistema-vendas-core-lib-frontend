import Product from "../../../../domain/entities/product";
import Price from "../../../../domain/vo/price";
import Quantity from "../../../../domain/vo/quantity";
import { left } from "../../../either";
import { ListServices, PickServices } from "../../../interfaces/services";
import ProductService from "../../../interfaces/services/productService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import AddProductCommand from "./AddProductCommand";

export default class AddProductUseCase extends UseCase {
  static inject: Array<ListServices> = ['ProductService'] as const

  private readonly productService: ProductService

  constructor(services: PickServices<'ProductService'>) {
    super()
    this.productService = services.ProductService
  }

  async execute(command: AddProductCommand): Promise<OperationResult> {
    if (!command.name) return left(new Error("Nome é obrigatório"));
    if (!command.description) return left(new Error("Descrição é obrigatória"));
    if (!command.code) return left(new Error("Código é obrigatório"));

    const product = this.createProduct(command);
    return await this.toOperationResult(await this.productService.Add(product));

  }

  private createProduct(command: AddProductCommand): Product {
    return {
      name: command.name,
      description: command.description,
      code: command.code,
      category: command.category,
      price: Price.create(command.price),
      quantity: Quantity.create(command.quantity),
      minimumQuantity: Quantity.create(command.minimumQuantity),
    } as Product;
  }
}
