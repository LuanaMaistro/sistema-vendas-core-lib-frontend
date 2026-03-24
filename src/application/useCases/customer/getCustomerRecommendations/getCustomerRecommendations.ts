import Recommendation from "../../../../domain/entities/recommendation";
import { ListServices, PickServices } from "../../../interfaces/services";
import CustomerService from "../../../interfaces/services/customerService";
import UseCase from "../../base/abstractUseCase";
import { OperationResult } from "../../base/OperationResult";
import GetCustomerRecommendationsCommand from "./GetCustomerRecommendationsCommand";

export default class GetCustomerRecommendations extends UseCase {

  static inject: Array<ListServices> = ['CustomerService'] as const

  private readonly customerService: CustomerService

  constructor(services: PickServices<'CustomerService'>) {
    super()
    this.customerService = services.CustomerService
  }

  async execute(command: GetCustomerRecommendationsCommand): Promise<OperationResult<Array<Recommendation>>> {
    return this.toOperationResult(this.customerService.GetRecommendations(command.customerId, command.quantidade))
  }
}
