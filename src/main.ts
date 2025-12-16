import * as Application from "./application";
import { left } from "./application/either";
import { ServicesFactories } from "./application/interfaces/services";
import { UseCaseInstances } from "./application/types";
import UseCase from "./application/useCases/base/abstractUseCase";

function createProxyUseCase<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);

      if (typeof original !== 'function') return original;

      return function (this: any, ...args: any[]) {
        try {
          const result = original.apply(this, args);

          if (result instanceof Promise) {
            return result.catch((error) => {
              return left(error)
            });
          }

          return result;
        } catch (error) {
          return left(error)
        }
      };
    }
  });
}

export function createApplicationInstance(factoriesServices: ServicesFactories): UseCaseInstances {
  const result: Record<string, UseCase> = {}

  for (const [name, aUseCaseClass] of Object.entries(Application.UsesCases)) {

    const servicesToInject = aUseCaseClass.inject || []

    const resolvedServices = servicesToInject.reduce((acc: any, currentService) => {
      const factory = factoriesServices[currentService]
      if (!factory) throw new Error(`No factory registered for ${currentService}`)
      acc[currentService] = factory()
      return acc
    }, {})

    const instance = new (aUseCaseClass as any)(resolvedServices)
    result[name] = createProxyUseCase(instance)
  }

  return result as UseCaseInstances
}

