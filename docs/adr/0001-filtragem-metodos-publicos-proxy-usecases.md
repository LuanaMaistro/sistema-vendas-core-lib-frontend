# ADR 0001: Filtragem de Métodos Públicos no Proxy de UseCases

**Data:** 2026-01-02
**Status:** Proposto
**Decisores:** Equipe de Desenvolvimento

## Contexto e Problema

### Contexto

A biblioteca `core-lib` implementa um sistema de casos de uso (UseCases) baseado no padrão Command. Todas as classes UseCase:
- Estendem de uma classe base `UseCase` abstrata
- Possuem um método público `execute()` como ponto de entrada
- Podem ter métodos privados auxiliares (helpers) para organização interna
- São instanciadas através da função `createApplicationInstance()` em `src/main.ts`

A função `createProxyUseCase()` envolve cada instância de UseCase em um Proxy JavaScript que adiciona tratamento automático de erros:
- Captura exceções síncronas e assíncronas
- Converte erros em `Either.left()` (padrão Either para tratamento de erros)
- Permite que toda a camada de aplicação use programação funcional

### Problema

Atualmente, o proxy intercepta **TODOS** os métodos da instância, incluindo:
- Métodos privados como `createCustomer()`, `buildCustomerUpdate()`
- Métodos protegidos da classe base como `toOperationResult()`
- Métodos auxiliares da base como `rightWay()`, `leftWay()`

Isso causa os seguintes problemas:

1. **Tratamento desnecessário**: Métodos internos que nunca serão chamados externamente estão sendo envolvidos com error handling
2. **Overhead de performance**: Cada acesso a métodos privados passa pelo proxy desnecessariamente
3. **Intenção não clara**: O código não expressa explicitamente que apenas `execute()` deveria ser o ponto de entrada público
4. **Complexidade em debugging**: Stack traces podem ser confusos com múltiplas camadas de proxy

### Limitações Técnicas

**Por que TypeScript não ajuda:**
- Modificadores de acesso (`public`, `private`, `protected`) são removidos na compilação para JavaScript
- Não há forma de verificar em runtime se um método foi declarado como `private` no TypeScript

**Por que interfaces não ajudam:**
- Interfaces TypeScript são puramente estáticas - existem apenas durante type-checking
- São completamente removidas na compilação para JavaScript
- Não há metadata de interface disponível em runtime

## Opções Consideradas

### Opção 1: Whitelist Simples (RECOMENDADA) ✅

**Descrição:**
Interceptar explicitamente apenas o método `execute()` no proxy.

**Implementação:**
```typescript
function createProxyUseCase<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);

      if (typeof original !== 'function') return original;

      // Only proxy the 'execute' method - skip all others
      if (prop !== 'execute') return original;

      return function (this: any, ...args: any[]) {
        try {
          const result = original.apply(this, args);
          if (result instanceof Promise) {
            return result.catch((error) => {
              console.log(original.name)
              return left(error)
            });
          }
          return result;
        } catch (error) {
          console.log(original.name)
          return left(error)
        }
      };
    }
  });
}
```

**Prós:**
- ✅ Implementação mínima: apenas 1 linha adicional
- ✅ Zero refatoração necessária em UseCases existentes
- ✅ Alinhado com arquitetura atual: todos os UseCases usam `execute()` como único método público
- ✅ Intenção explícita e clara no código
- ✅ Fácil de entender e manter

**Contras:**
- ⚠️ Hardcoded para `execute()` - não é configurável
- ⚠️ Se futuros UseCases precisarem de múltiplos métodos públicos, será necessário revisitar

---

### Opção 2: Abordagem Híbrida com Propriedade Estática

**Descrição:**
Usar uma propriedade estática `publicMethods` em cada UseCase para declarar quais métodos devem ser proxied, com fallback para `['execute']`.

**Implementação:**
```typescript
// Base class
abstract class UseCase {
  static inject: Array<ListServices>
  static publicMethods: string[] = ['execute'] // Novo
  // ...
}

// Proxy
function createProxyUseCase<T extends object>(target: T): T {
  const publicMethods = (target.constructor as any).publicMethods || ['execute'];

  return new Proxy(target, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);

      if (typeof original !== 'function') return original;
      if (!publicMethods.includes(prop as string)) return original;

      // ... resto do wrapping
    }
  });
}

// UseCase específica pode override se necessário
class CustomUseCase extends UseCase {
  static publicMethods = ['execute', 'validate']
  // ...
}
```

**Prós:**
- ✅ Extensível: permite múltiplos métodos públicos por UseCase
- ✅ Segue padrão já usado (`static inject`)
- ✅ Configurável por classe
- ✅ Mantém compatibilidade (fallback para `['execute']`)

**Contras:**
- ⚠️ Mais complexo que Opção 1
- ⚠️ Requer modificação da classe base
- ⚠️ Possível duplicação de informação (TypeScript types vs runtime array)
- ⚠️ Overkill para necessidade atual (apenas `execute()`)

---

### Opção 3: Convenção de Nomenclatura (Underscore)

**Descrição:**
Adotar convenção JavaScript de usar `_` como prefixo para métodos privados e filtrar no proxy.

**Implementação:**
```typescript
// Refatorar todos os UseCases
class AddCustomerUseCase extends UseCase {
  async execute(command: AddCustomerCommand) {
    const customer = this._createCustomer(command); // Renomeado
    return this.toOperationResult(this.customerServices.Add(customer));
  }

  private _createCustomer(command: AddCustomerCommand): Customer { // Renomeado
    // ...
  }
}

// Proxy
function createProxyUseCase<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);

      if (typeof original !== 'function') return original;
      if (typeof prop === 'string' && prop.startsWith('_')) return original;

      // ... resto do wrapping
    }
  });
}
```

**Prós:**
- ✅ Convenção JavaScript comum e reconhecida
- ✅ Extensível: qualquer método sem `_` pode ser público
- ✅ Visualmente claro quais métodos são privados

**Contras:**
- ❌ Requer refatoração de TODAS as UseCases existentes (5+ classes)
- ❌ Mistura convenção (underscore) com TypeScript `private` - redundante
- ❌ Trabalho significativo sem benefício proporcional
- ❌ Não resolve o problema de métodos protegidos da classe base

---

### Opção 4: JavaScript Private Fields (`#method`)

**Descrição:**
Usar a sintaxe de campos privados nativa do JavaScript moderno (`#methodName`).

**Implementação:**
```typescript
class AddCustomerUseCase extends UseCase {
  async execute(command: AddCustomerCommand) {
    const customer = this.#createCustomer(command);
    return this.toOperationResult(this.customerServices.Add(customer));
  }

  #createCustomer(command: AddCustomerCommand): Customer {
    // ...
  }
}

// Proxy automaticamente não vê campos privados #
// Eles são verdadeiramente privados em runtime
```

**Prós:**
- ✅ Privacidade real em runtime (não apenas type-checking)
- ✅ Padrão ECMAScript oficial (ES2022)
- ✅ Suportado por TypeScript

**Contras:**
- ❌ Requer refatoração massiva de todas as UseCases
- ❌ Métodos protegidos (`protected`) não podem usar `#` (não são acessíveis em subclasses)
- ❌ Classe base `UseCase` tem métodos protegidos (`toOperationResult`) que seriam afetados
- ❌ Mudança invasiva na arquitetura existente

---

### Opção 5: Interface TypeScript

**Descrição:**
Usar uma interface TypeScript para definir métodos públicos.

**Análise:**
```typescript
interface PublicAPI {
  execute(...args: any[]): Promise<OperationResult>;
}

class AddCustomerUseCase extends UseCase implements PublicAPI {
  // ...
}
```

**Por que NÃO funciona:**
- ❌ Interfaces são completamente removidas na compilação para JavaScript
- ❌ Não há metadata de interface disponível em runtime
- ❌ `keyof Interface` também é apenas type-checking, não existe em runtime
- ❌ Não há forma de verificar em runtime se um método faz parte de uma interface

**Conclusão:** Esta opção é tecnicamente inviável.

## Decisão

**Escolhida: Opção 1 - Whitelist Simples**

Implementar uma verificação explícita no proxy para interceptar apenas o método `execute()`.

## Justificativa

### Análise da Arquitetura Atual

Análise de todas as UseCases existentes no projeto:

| UseCase | Métodos Públicos | Métodos Privados | Padrão |
|---------|------------------|------------------|--------|
| AddCustomerUseCase | execute | createCustomer | ✅ |
| ListCustomersUseCase | execute | - | ✅ |
| UpdateCustomerUseCase | execute | buildCustomerUpdate | ✅ |
| RemoveCustomerUseCase | execute | - | ✅ |
| GetCustomerByIdUseCase | execute | - | ✅ |

**Conclusão:** 100% das UseCases seguem o padrão de ter `execute()` como único método público.

### Razões para Escolher Opção 1

1. **Alinhamento com arquitetura**: Todos os UseCases existentes expõem apenas `execute()`
2. **Princípio KISS (Keep It Simple)**: Solução mais simples possível que atende ao requisito
3. **Sem refatoração**: Zero mudanças em código existente
4. **Clareza de intenção**: O código explicitamente mostra que apenas `execute()` é público
5. **Custo-benefício**: Máximo benefício com mínimo esforço
6. **Manutenibilidade**: Fácil de entender e modificar no futuro

### Por que não as outras opções?

- **Opção 2 (Híbrida)**: Adiciona complexidade desnecessária para um caso que não existe (múltiplos métodos públicos)
- **Opção 3 (Underscore)**: Trabalho de refatoração não justificado
- **Opção 4 (Private Fields)**: Mudança arquitetural muito invasiva
- **Opção 5 (Interface)**: Tecnicamente impossível

### Tratamento de Erros

Com a Opção 1, erros lançados em métodos privados ainda são capturados corretamente:

```typescript
class AddCustomerUseCase extends UseCase {
  async execute(command: AddCustomerCommand) {
    // execute() é proxied - erros são capturados aqui
    const customer = this.createCustomer(command); // createCustomer() NÃO é proxied
    return this.toOperationResult(this.customerServices.Add(customer));
  }

  private createCustomer(command: AddCustomerCommand): Customer {
    // Se houver erro aqui, ele sobe (throw) para execute()
    // onde será capturado pelo proxy e convertido em Either.left()
    throw new Error('CPF inválido'); // ❌ Erro lançado
  }
}

// Fluxo:
// 1. createCustomer() lança erro
// 2. Erro sobe para execute()
// 3. Proxy de execute() captura e converte para left()
// ✅ Resultado final: Either.left(Error)
```

Este comportamento é **desejável** - erros devem naturalmente subir para o ponto de entrada onde são tratados.

## Consequências

### Positivas

- ✅ **Métodos privados não são mais envolvidos desnecessariamente**: Reduz overhead e complexidade
- ✅ **Error handling focado no ponto de entrada**: Apenas `execute()` tem wrapping, como deveria ser
- ✅ **Código mais limpo e com intenção explícita**: A verificação `if (prop !== 'execute')` documenta a intenção
- ✅ **Performance ligeiramente melhor**: Menos chamadas passando pelo proxy
- ✅ **Compatibilidade total com código existente**: Nenhuma quebra de compatibilidade
- ✅ **Facilita debugging**: Stack traces mais limpos sem proxies desnecessários
- ✅ **Manutenção simplificada**: Menos "mágica" acontecendo nos bastidores

### Negativas

- ⚠️ **Hardcoded para `execute()`**: Se um UseCase futuro precisar expor outro método público (ex: `validate()`), será necessário:
  - Revisitar esta decisão, ou
  - Migrar para Opção 2 (Híbrida)
- ⚠️ **Não é configurável por UseCase**: Todos os UseCases são tratados da mesma forma

### Neutras

- **Erros em métodos privados continuam sendo capturados**: Quando sobem para `execute()`, são tratados corretamente
- **TypeScript types permanecem inalterados**: A verificação de tipos continua funcionando normalmente
- **Não previne acesso direto a métodos privados**: JavaScript permite `instance.createCustomer()` se alguém quiser (mas TypeScript irá alertar)

## Alternativa de Migração Futura

Se no futuro surgir a necessidade de múltiplos métodos públicos por UseCase, a migração para Opção 2 (Híbrida) é simples:

```typescript
// Passo 1: Adicionar propriedade estática na base (opcional)
abstract class UseCase {
  static publicMethods: string[] = ['execute']
}

// Passo 2: Modificar proxy (2 linhas)
function createProxyUseCase<T extends object>(target: T): T {
  const publicMethods = (target.constructor as any).publicMethods || ['execute'];
  return new Proxy(target, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);
      if (typeof original !== 'function') return original;

      // Trocar esta linha:
      // if (prop !== 'execute') return original;
      // Por esta:
      if (!publicMethods.includes(prop as string)) return original;

      // ... resto inalterado
    }
  });
}

// Passo 3: Em UseCases específicas que precisarem
class SpecialUseCase extends UseCase {
  static publicMethods = ['execute', 'validate', 'preview']

  async execute() { /* ... */ }
  async validate() { /* ... */ }
  async preview() { /* ... */ }
}
```

**Custo da migração:** Baixo - apenas 2 linhas de código no proxy, e UseCases existentes continuam funcionando sem mudanças.

## Implementação

### Arquivo Modificado
`src/main.ts` - função `createProxyUseCase()` (linhas ~13-39)

### Mudança Exata
```diff
function createProxyUseCase<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);

      if (typeof original !== 'function') return original;

+     // Only proxy the 'execute' method - skip all other methods (private/protected)
+     if (prop !== 'execute') return original;

      return function (this: any, ...args: any[]) {
        try {
          const result = original.apply(this, args);

          if (result instanceof Promise) {
            return result.catch((error) => {
              console.log(original.name)
              return left(error)
            });
          }

          return result;
        } catch (error) {
          console.log(original.name)
          return left(error)
        }
      };
    }
  });
}
```

### Validação
```bash
npm run build
```

Verificar que:
- Build completa sem erros
- Tipos TypeScript continuam corretos
- Testes passam (se houver)

## Referências

### Código
- `src/main.ts:createProxyUseCase()` - Implementação do proxy
- `src/application/useCases/base/abstractUseCase.ts` - Classe base UseCase
- `src/application/useCases/customer/*/*.ts` - Exemplos de UseCases concretas

### Contexto Técnico
- Target: ES2020 (tsconfig.json)
- Padrão: Command Pattern + Either para error handling
- Dependency Injection via `static inject` property

### Discussão
- Discussão inicial sobre necessidade de filtrar métodos públicos
- Análise de 5 abordagens diferentes
- Consideração de limitações do TypeScript em runtime
- Data: 2026-01-02
