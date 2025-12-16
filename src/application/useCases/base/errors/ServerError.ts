import OperationError from "./OperationError";

export default class ServerError extends OperationError {
  public code: string = "E500";

  constructor(){
    super("Erro no servidor")
  }
}
