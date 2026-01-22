import Result from "./result";

export default interface CrudService<T> {
  Add(entity: T): Result
  Remove(id: string): Result
  Update(entity: T): Result
  List(): Promise<Result<Array<T>>>
  GetById(id: string): Result<T>
}

