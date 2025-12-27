import Result from "./result";

export default interface CrudService<T> {
  Add(entity: T): Result
  Remove(entity: T): Result
  Update(entity: T): Result
  List(): Result<Array<T>>
}

