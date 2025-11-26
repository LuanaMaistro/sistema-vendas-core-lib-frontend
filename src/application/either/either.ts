export type Either<L, R> =
  | { tag: 'left'; value: L }
  | { tag: 'right'; value: R };

export const left = <L, R = never>(value: L): Either<L, R> => ({
  tag: 'left',
  value
});

export const right = <R, L = never>(value: R): Either<L, R> => ({
  tag: 'right',
  value
});

export const isLeft = <L, R>(either: Either<L, R>): either is { tag: 'left'; value: L } => {
  return either.tag === 'left';
};

export const isRight = <L, R>(either: Either<L, R>): either is { tag: 'right'; value: R } => {
  return either.tag === 'right';
};

export const fold = <L, R, T>(
  onLeft: (left: L) => T,
  onRight: (right: R) => T
) => (either: Either<L, R>): T => {
  return isLeft(either)
    ? onLeft(either.value)
    : onRight(either.value);
};

export const map = <L, R, T>(
  fn: (value: R) => T
) => (either: Either<L, R>): Either<L, T> => {
  return isRight(either)
    ? right(fn(either.value))
    : left(either.value);
};
