Você deve agir como um:
- especialista em Typescript
- especialista em DDD
- arquiteto de software experiente
- programador funcional sênior
- programador POO sênior


Esse projeto está dividido em duas camadas principais:
- application: onde estão os casos de uso e regras de negocio operacionais
- domain: onde estão as classes, V.Os, e erros de domínio

Padrões e convenções:
- **Esse projeto não possui as camadas de infraestrutura e apresentação e NÃO DEVE POSSUIR**
- Esse projeto usa o padrão funcional Right e Left. Exceptions/Erros **não devem ser lançadas, mas retornadas com left**
- Na camada de domínio são utilizadas interfaces ao invés de classes. Isso é proposital e deve ser mantido

## Padrões de Use Cases

### Estrutura de um Use Case:
1. **Herança**: Todo use case estende `UseCase` (abstract class em `src/application/useCases/base/abstractUseCase.ts`)
2. **Injeção de Dependências**:
   - Propriedade estática `inject: Array<ListServices>` declara os serviços necessários
   - Constructor recebe `services: PickServices<'NomeDoServico'>`
   - Exemplo: `static inject: Array<ListServices> = ['CustomerSerivce'] as const`
3. **Método execute**:
   - Assinatura: `async execute(command: DTO): Promise<OperationResult>`
   - Recebe um DTO (interface simples) como parâmetro
   - Retorna `OperationResult` que é um Either<Error, T>
4. **Conversão de Result para OperationResult**:
   - Use `this.toOperationResult(serviceResult)` para converter Result do serviço em Either
   - O método base converte automaticamente códigos HTTP em erros apropriados

### Estrutura de Commands:
- Commands são interfaces simples (não classes)
- Convenção de nome: `{NomeDoUseCase}Command`
- Exemplo: `AddCustomerCommand`, `UpdateCustomerCommand`
- Ficam no mesmo diretório do use case

### Serviços Disponíveis:
- **CustomerSerivce** (nota: há um typo no código original - CustomerSerivce ao invés de CustomerService)
- **ProductService**
- Ambos implementam `CrudService<T>` com métodos:
  - `Add(entity: T): Result`
  - `Remove(entity: T): Result`
  - `Update(entity: T): Result`
  - `List(): Result<Array<T>>`
  - `GetById(id: string): Result<T>`

### Result vs OperationResult:
- **Result** (retorno de serviços): `{ success: boolean, data?: T, code: 400 | 500 | 200 }`
- **OperationResult** (retorno de use cases): `Either<OperationError | Error, T>`
- Use `toOperationResult()` do base class para converter

### Organização de Use Cases:
```
src/application/useCases/{entidade}/{nomeDoUseCase}/
├── {NomeDoUseCase}Dto.ts     # Interface do comando/input
└── {nomeDoUseCase}.ts         # Classe do use case
```

### Value Objects (domínio):
- CPF e CNPJ são Value Objects com validação
- Use factory method: `CPF.create(value)` ou `CNPJ.create(value)`
- Lançam `ValueObjectError` se inválidos (mas lembre-se de capturar e retornar como left no use case)

### Implementação Padrão de GetById:
**IMPORTANTE**: Use cases GetById devem SEMPRE usar o método `GetById` do service.

```typescript
async execute(command: GetByIdCommand): Promise<OperationResult<Entity>> {
  if(!command.id) return left(new Error("ID é obrigatório"))

  return this.toOperationResult(this.service.GetById(command.id))
}
```

**NUNCA faça:**
- ❌ Chamar `List()` e filtrar manualmente com `.find()`
- ❌ Implementar lógica de busca no use case
- ❌ Retornar erro customizado de "não encontrado" no use case

**O service é responsável por:**
- ✅ Buscar o registro por ID
- ✅ Retornar erro apropriado se não encontrado (código 400 ou 500)
- ✅ Retornar o objeto pronto em caso de sucesso

### Entidade Customer:
```typescript
interface Customer extends Entity {
  name: string
  Cnpj?: CNPJ
  Cpf?: CPF
  CustomerContact?: CustomerContact
}
```
- Customer pode ter CPF (pessoa física) OU CNPJ (pessoa jurídica)
- Possui contato opcional com email e phone



