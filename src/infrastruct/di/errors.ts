import { Token } from "./token";

export class DependencyNotFoundError extends Error {
  constructor(token: Token<any>) {
    super(`Dependency not found: ${token.description}`);
    this.name = 'DependencyNotFoundError';
  }
}

export class CircularDependencyError extends Error {
  constructor(chain: string[]) {
    super(`Circular dependency detected: ${chain.join(' -> ')}`);
    this.name = 'CircularDependencyError';
  }
}


