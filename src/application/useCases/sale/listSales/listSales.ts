import { Sale } from "../../../../domain";
import { ListServices, PickServices } from "../../../interfaces/services";
import SaleService from "../../../interfaces/services/saleService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import ListSalesCommand from "./ListSalesCommand";

export default class ListSalesUseCase extends UseCase {

  static inject: Array<ListServices> = ['SaleService'] as const

  private readonly saleService: SaleService

  constructor(services: PickServices<'SaleService'>) {
    super()
    this.saleService = services.SaleService
  }

  async execute(filters?: ListSalesCommand): Promise<OperationResult<Array<Sale>>> {
    if(!filters)
      return await this.toOperationResult(await this.saleService.List())

    const serviceResult = await this.saleService.ListSales({
      customerId: filters.customerId,
      status: filters.status,
      startDate: filters.startDate,
      endDate: filters.endDate
    })
    return await this.toOperationResult(serviceResult)
  }
}
