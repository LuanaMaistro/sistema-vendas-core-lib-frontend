import { Sale } from "../../../../domain";
import { left } from "../../../either";
import { ListServices, PickServices } from "../../../interfaces/services";
import SaleService from "../../../interfaces/services/saleService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import GetSaleByIdCommand from "./GetSaleByIdCommand";

export default class GetSaleByIdUseCase extends UseCase {

  static inject: Array<ListServices> = ['SaleService'] as const

  private readonly saleService: SaleService

  constructor(services: PickServices<'SaleService'>) {
    super()
    this.saleService = services.SaleService
  }

  async execute(command: GetSaleByIdCommand): Promise<OperationResult<Sale>> {
    if(!command.id) return left(new Error("ID é obrigatório"))

    return this.toOperationResult(await this.saleService.GetById(command.id))
  }
}
