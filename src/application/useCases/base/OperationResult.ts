import { Either } from "../../either";
import OperationError from "./errors/OperationError";

export type OperationResult<T = undefined> = Either<OperationError, T>
