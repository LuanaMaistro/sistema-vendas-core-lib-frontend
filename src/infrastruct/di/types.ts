import type { Token } from "./token";

export enum Scope {
  TRANSIENT = 'transient',
  SINGLETON = 'singleton',
  SCOPED = 'scoped',
}

export type Factory<T> = (container: Container) => T

export interface Provider<T> {
  token: Token<T>;
  factory: Factory<T>;
  scope: Scope;
}

export interface Container {
  register<T>(token: Token<T>, factory: Factory<T>, scope?: Scope): void;
  resolve<T>(token: Token<T>): T;
  has<T>(token: Token<T>): boolean;
  createScope(): Container;
}

