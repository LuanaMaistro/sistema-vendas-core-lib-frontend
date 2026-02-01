import { Sale } from "../../../../domain";
import { left } from "../../../either";
import { ListServices, PickServices } from "../../../interfaces/services";
import SaleService from "../../../interfaces/services/saleService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import AddItemToSaleCommand from "./AddItemToSaleCommand";

export default class AddItemToSaleUseCase extends UseCase {

  static inject: Array<ListServices> = ['SaleService'] as const

  private readonly saleService: SaleService

  constructor(services: PickServices<'SaleService'>) {
    super()
    this.saleService = services.SaleService
  }

  async execute(command: AddItemToSaleCommand): Promise<OperationResult<Sale>> {
    if(!command.saleId) return left(new Error("ID da venda é obrigatório"))
    if(!command.productId) return left(new Error("ID do produto é obrigatório"))
    if(!command.quantity || command.quantity <= 0) return left(new Error("Quantidade deve ser maior que zero"))

    return this.toOperationResult(
      await this.saleService.AddItem(command.saleId, {
        productId: command.productId,
        quantity: command.quantity
      })
    )
  }
}
