import { CustomerService, ListServices, PickServices } from "../../../interfaces/services"
import { OperationResult } from "../../base"
import UseCase from "../../base/abstractUseCase"
import { ToggleActiveStatusCommand } from "./toggleActiveStatusCommand"

export default class ToggleActiveStatusUseCase extends UseCase {
  static inject: Array<ListServices> = ['CustomerService'] as const

  private readonly customerServices: CustomerService

  constructor(services: PickServices<'CustomerService'>) {
    super()
    this.customerServices = services.CustomerService
  }

  async execute(command: ToggleActiveStatusCommand): Promise<OperationResult> {
    return await this.toOperationResult(await this.customerServices.ToogleActiveStatus(command.customer))
  }

}

