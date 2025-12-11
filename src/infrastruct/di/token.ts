const TYPE_SYMBOL = Symbol('DI_TOKEN_TYPE')


export interface Token<T> {
  readonly symbol: symbol
  readonly description: string
  [TYPE_SYMBOL]: T
}

export function createToken<T>(description: string): Token<T> {
  return {
    symbol: Symbol(description),
    description,
    [TYPE_SYMBOL]: undefined as T
  }
}

export type TokenType<T extends Token<any>> = T[typeof TYPE_SYMBOL]

