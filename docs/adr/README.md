# Architecture Decision Records (ADRs)

Este diretório contém os registros de decisões arquiteturais (ADRs) do projeto core-lib.

## O que é um ADR?

Um Architecture Decision Record (ADR) documenta uma decisão arquitetural significativa tomada no projeto, incluindo o contexto, as opções consideradas, a decisão tomada e suas consequências.

## Formato

Utilizamos o formato MADR (Markdown Any Decision Records) simplificado para manter os ADRs concisos e fáceis de ler.

## Índice de ADRs

| ADR | Título | Status | Data |
|-----|--------|--------|------|
| [0001](./0001-filtragem-metodos-publicos-proxy-usecases.md) | Filtragem de Métodos Públicos no Proxy de UseCases | Proposto | 2026-01-02 |

## Como criar um novo ADR

1. Crie um novo arquivo seguindo a numeração sequencial: `XXXX-titulo-do-adr.md`
2. Use o template MADR (veja ADR 0001 como exemplo)
3. Adicione uma entrada na tabela acima
4. Commit e abra um PR para discussão

## Template

```markdown
# ADR XXXX: [Título]

**Data:** YYYY-MM-DD
**Status:** Proposto | Aceito | Rejeitado | Substituído | Obsoleto
**Decisores:** [Nome(s)]

## Contexto e Problema
[Descreva o contexto e o problema que motivou esta decisão]

## Opções Consideradas
- Opção 1: [descrição]
- Opção 2: [descrição]
- Opção 3: [descrição]

## Decisão
[Qual opção foi escolhida]

## Justificativa
[Por que essa opção foi escolhida]

## Consequências

### Positivas
- [Benefício 1]
- [Benefício 2]

### Negativas
- [Trade-off 1]
- [Trade-off 2]

### Neutras
- [Outro impacto]

## Referências
- [Links para código, issues, PRs, documentação externa]
```
