import { Sale } from "../../../../domain";
import { left } from "../../../either";
import { ListServices, PickServices } from "../../../interfaces/services";
import SaleService from "../../../interfaces/services/saleService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import UpdateItemQuantityCommand from "./UpdateItemQuantityCommand";

export default class UpdateItemQuantityUseCase extends UseCase {

  static inject: Array<ListServices> = ['SaleService'] as const

  private readonly saleService: SaleService

  constructor(services: PickServices<'SaleService'>) {
    super()
    this.saleService = services.SaleService
  }

  async execute(command: UpdateItemQuantityCommand): Promise<OperationResult<Sale>> {
    if(!command.saleId) return left(new Error("ID da venda é obrigatório"))
    if(!command.itemId) return left(new Error("ID do item é obrigatório"))
    if(!command.quantity || command.quantity <= 0) return left(new Error("Quantidade deve ser maior que zero"))

    return this.toOperationResult(
      await this.saleService.UpdateItemQuantity(command.saleId, command.itemId, command.quantity)
    )
  }
}
