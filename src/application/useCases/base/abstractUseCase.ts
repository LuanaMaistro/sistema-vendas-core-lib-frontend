import { left, right } from "../../either";
import { ListServices } from "../../interfaces/services";
import Result from "../../interfaces/services/base/result";
import ClienteError from "./errors/ClientError";
import ServerError from "./errors/ServerError";
import { OperationResult } from "./OperationResult";

export default abstract class UseCase {
  static inject: Array<ListServices>

  protected toOperationResult(aResult: Result): OperationResult{
    if(!aResult.success) return this.leftWay(aResult)
    return this.rightWay(aResult)
  }

  private rightWay(aResult: Result) {
    return right(aResult.data)
  }

  private leftWay(aResult: Result) {
    if(aResult.code === 400) return left(new ClienteError())
    if(aResult.code === 500) return left(new ServerError())

    return left(new Error('erro desconhecido'))
  }
}
