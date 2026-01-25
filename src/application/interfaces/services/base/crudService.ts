import Result from "./result";

export default interface CrudService<T> {
  Add(entity: T): Promise<Result>
  Remove(id: string): Promise<Result>
  Update(entity: T): Promise<Result>
  List(): Promise<Result<Array<T>>>
  GetById(id: string): Promise<Result<T>>
}

