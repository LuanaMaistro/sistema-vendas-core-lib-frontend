import { CircularDependencyError, DependencyNotFoundError } from './errors';
import type { Token } from './token';
import type { Container, Factory, Provider, Scope } from './types';
import { Scope as ScopeEnum } from './types';

export class DIContainer implements Container {
  private providers = new Map<symbol, Provider<any>>();
  private singletons = new Map<symbol, any>();
  private scopedInstances = new Map<symbol, any>();
  private resolutionStack: symbol[] = [];
  private parentContainer?: Container;

  constructor(parentContainer?: Container) {
    this.parentContainer = parentContainer;
  }

  register<T>(token: Token<T>, factory: Factory<T>, scope: Scope = ScopeEnum.SINGLETON) {
    this.providers.set(token.symbol, {
      token,
      factory,
      scope,
    });
  }

  resolve<T>(token: Token<T>): T {
    if (this.resolutionStack.includes(token.symbol)) {
      const chain = this.resolutionStack.map((s) => this.providers.get(s)?.token.description || 'unknown');
      chain.push(token.description);
      throw new CircularDependencyError(chain);
    }

    const provider = this.getProvider(token)

    switch (provider.scope) {
      case ScopeEnum.SINGLETON:
        return this.resolveSingleton(provider);

      case ScopeEnum.SCOPED:
        return this.resolveScoped(provider);

      case ScopeEnum.TRANSIENT:
        return this.resolveTransient(provider);

      default:
        throw new Error(`Unknown scope: ${provider.scope}`);
    }
  }

  private getProvider<T>(aToken: Token<T>): Provider<T>{
    const result = this.providers.get(aToken.symbol) as Provider<T> || this.getFromParent(aToken)
    if (!result) throw new DependencyNotFoundError(aToken);

    return result
  }

  private getFromParent<T>(aToken: Token<T>) {
    if(!this.parentContainer || !this.parentContainer.has(aToken)) return undefined
    return this.parentContainer.resolve(aToken)
  }


  has<T>(token: Token<T>): boolean {
    return this.providers.has(token.symbol) || this.parentHas(token)
  }

  private parentHas<T>(token: Token<T>) {
    if (!this.parentContainer) return false
    return this.parentContainer.has(token)
  }

  createScope(): Container {
    return new DIContainer(this);
  }

  clear(): void {
    this.singletons.clear();
    this.scopedInstances.clear();
    this.resolutionStack = [];
  }

  private resolveSingleton<T>(provider: Provider<T>): T {
    if (!this.singletons.has(provider.token.symbol)) {
      const instance = this.createInstance(provider);
      this.singletons.set(provider.token.symbol, instance);
    }
    return this.singletons.get(provider.token.symbol)!;
  }

  private resolveScoped<T>(provider: Provider<T>): T {
    if (!this.scopedInstances.has(provider.token.symbol)) {
      const instance = this.createInstance(provider);
      this.scopedInstances.set(provider.token.symbol, instance);
    }
    return this.scopedInstances.get(provider.token.symbol)!;
  }

  private resolveTransient<T>(provider: Provider<T>): T {
    return this.createInstance(provider);
  }

  private createInstance<T>(provider: Provider<T>): T {
    this.resolutionStack.push(provider.token.symbol);
    try {
      return provider.factory(this);
    } finally {
      this.resolutionStack.pop();
    }
  }

}

export function createContainer(): Container {
  return new DIContainer();
}
