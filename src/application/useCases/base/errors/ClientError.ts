import OperationError from "./OperationError";

export default class ClienteError extends OperationError {
  public code: string = "E400";

  constructor(){
    super("Erro no cliente")
  }
}
