export default abstract class OperationError extends Error {

  public abstract code: string;

  constructor(message: string){
    super(message)
  }
}

