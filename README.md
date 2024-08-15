# Descrição do Trabalho Realizado

## Visão Geral

Este pull request implementa o aplicativo de gerenciamento de tarefas solicitado no desafio Corelab. O projeto foi desenvolvido em duas partes: um frontend utilizando React com TypeScript e um backend utilizando Node.js com Express e Knex. Cada uma das partes do projeto foi estruturada e documentada para atender aos requisitos funcionais e técnicos descritos no desafio.

## Funcionalidades Implementadas

### Backend

1. **Configuração do Ambiente:**
   - Configurado um ambiente Node.js com Express.
   - Implementação de variáveis de ambiente utilizando o `dotenv`.
   - Configuração do banco de dados PostgreSQL com Knex.js para migrações e seeds.

2. **Autenticação:**
   - Implementação de autenticação JWT para proteger as rotas da API.
   - Criação de middleware para validar tokens em rotas protegidas.

3. **CRUD de Tarefas:**
   - Criação de endpoints RESTful para criar, ler, atualizar e deletar tarefas.
   - Implementação de lógica para atribuição de cores e favoritos a cada tarefa.
   - Testes unitários das rotas utilizando `Jest` e `Supertest`.

4. **Banco de Dados:**
   - Configuração de migrações para criar a estrutura de tabelas do banco de dados.
   - Seeds para popular o banco de dados com dados iniciais para testes.

### Frontend

1. **Estruturação do Projeto:**
   - Configuração do ambiente de desenvolvimento com Vite e React.
   - Configuração do TypeScript para tipagem estática.
   - Organização de pastas para componentes, serviços, hooks, e estilos.

2. **Interface Responsiva:**
   - Implementação de um design responsivo seguindo as diretrizes fornecidas.
   - Utilização do Sass para modularização e reutilização de estilos.

3. **Gerenciamento de Estado:**
   - Implementação de gerenciamento de estado utilizando `Zustand`.
   - Criação de hooks customizados para manipulação de dados de tarefas.

4. **Integração com API:**
   - Conexão com a API backend para realizar operações CRUD.
   - Utilização do `axios` para realizar requisições HTTP.
   - Implementação de feedback visual ao usuário com `react-toastify`.

5. **Filtragem e Ordenação:**
   - Implementação de funcionalidades de filtro por favoritos e por cor.
   - Garantia de que os itens favoritos sejam exibidos no topo da lista.

## Melhorias Adicionais

- **Configuração do ESLint e Prettier:**
  - Aplicação de regras específicas de linting e formatação de código.
  - Garantia de um código consistente e limpo.

- **Testes Automatizados:**
  - Testes para o backend utilizando `Jest` para garantir a qualidade das rotas e funcionalidades.
  - Estruturação de testes end-to-end para simular o comportamento do usuário.

- **Documentação:**
  - Adição de comentários e documentação nas funções mais importantes para facilitar a leitura do código.
  - Criação deste arquivo `PULL_REQUEST.md` detalhando todo o processo de desenvolvimento.

## Instruções de Configuração

### Backend

- Instale as dependências e configure as variáveis de ambiente conforme indicado no `README.md`.
- Execute as migrações e seeds para preparar o banco de dados.
- Inicie o servidor em ambiente de desenvolvimento com `npm run dev`.

### Frontend

- Instale as dependências e inicie o servidor de desenvolvimento com `npm run dev`.

