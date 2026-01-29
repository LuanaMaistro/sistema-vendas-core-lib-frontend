import { SaleItem, SaleStatus } from "../../../../domain";
import { left } from "../../../either";
import { ListServices, PickServices } from "../../../interfaces/services";
import SaleService from "../../../interfaces/services/saleService";
import { OperationResult } from "../../base";
import UseCase from "../../base/abstractUseCase";
import CreateSaleCommand from "./CreateSaleCommand";

export default class CreateSaleUseCase extends UseCase {

  static inject: Array<ListServices> = ['SaleService'] as const

  private readonly saleService: SaleService

  constructor(services: PickServices<'SaleService'>) {
    super()
    this.saleService = services.SaleService
  }

  async execute(command: CreateSaleCommand): Promise<OperationResult> {

    if(!command.customer.active)
      return left(new Error("Cliente inativo não pode realizar vendas"))

    if(!command.items || command.items.length === 0)
      return left(new Error("A venda deve conter ao menos um item"))

    const toSaleItem = (item: { productId: string; quantity: number }): SaleItem => ({
      productId: item.productId,
      quantity: item.quantity,
    })

    const result = await this.saleService.Add({
      customerId: command.customer.id!,
      items: command.items.map(toSaleItem),
      paymentMethod: command.paymentMethod,
      observations: command.observations,
      status: SaleStatus.PENDING
    })

    return await this.toOperationResult(result)
  }
}

