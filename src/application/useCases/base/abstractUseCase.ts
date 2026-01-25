import { left, right } from "../../either";
import { ListServices } from "../../interfaces/services";
import Result from "../../interfaces/services/base/result";
import ClienteError from "./errors/ClientError";
import ServerError from "./errors/ServerError";
import { OperationResult } from "./OperationResult";

export default abstract class UseCase {
  static inject: Array<ListServices>

  protected async toOperationResult<T = undefined>(aResult: Result<T> | Promise<Result<T>>): Promise<OperationResult<T>> {
    const result = aResult instanceof Promise ? await aResult : aResult
    if(!result.success) return this.leftWay(result)
    return this.rightWay(result)
  }

  private rightWay<T = undefined>(aResult: Result<T>) {
    return right(aResult.data!)
  }

  private leftWay<T = undefined>(aResult: Result<T>) {
    if(aResult.code === 400) return left(new ClienteError())
    if(aResult.code === 500) return left(new ServerError())

    return left(new Error('erro desconhecido'))
  }
}
