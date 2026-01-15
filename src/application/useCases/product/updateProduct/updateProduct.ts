import Product from "../../../../domain/entities/product";
import Price from "../../../../domain/vo/price";
import Quantity from "../../../../domain/vo/quantity";
import { left } from "../../../either/either";
import { ListServices, PickServices } from "../../../interfaces/services";
import ProductService from "../../../interfaces/services/productService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import UpdateProductCommand from "./UpdateProductCommand";

export default class UpdateProductUseCase extends UseCase {
  static inject: Array<ListServices> = ['ProductService'] as const

  private readonly productService: ProductService

  constructor(services: PickServices<'ProductService'>) {
    super()
    this.productService = services.ProductService
  }

  async execute(command: UpdateProductCommand): Promise<OperationResult> {
    if (!command.id) return left(new Error("ID é obrigatório"));

    const product = this.buildProductUpdate(command);
    return this.toOperationResult(this.productService.Update(product));
  }

  private buildProductUpdate(command: UpdateProductCommand): Product {
    const result = { id: command.id } as Product;

    if (command.name) result.name = command.name;
    if (command.description) result.description = command.description;

    if (Price.isValid(command.price!))
      result.price = Price.create(command.price!);

    if (Quantity.isValid(command.quantity!))
      result.quantity = Quantity.create(command.quantity!);

    return result;
  }
}
