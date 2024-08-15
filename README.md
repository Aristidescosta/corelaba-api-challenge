# Aplicativo de Gerenciamento de notas

Este projeto consiste em uma aplicação web para gerenciar listas de notas, dividido em duas partes: frontend e backend. O frontend é construído em React com TypeScript, e o backend é construído em Node.js utilizando Express.

## Estrutura do Projeto

- **frontend**: Contém o código-fonte do frontend desenvolvido com React e TypeScript.
- **backend**: Contém o código-fonte do backend desenvolvido com Node.js e Express.

## Pré-requisitos

Certifique-se de ter instalado as seguintes ferramentas:

- Node.js (versão ^16.15.0)
- NPM (versão ^8.5.5)
- Banco de dados PostgreSQL ou SQLite3 (ou outro conforme sua escolha)

## Configuração do Backend

1. Clone o repositório do projeto:

   ```bash
   git clone https://github.com/Aristidescosta/corelaba-challenge.git
   ```

2. Navegue até o diretório do backend:

   ```bash
   cd backend
   ```

3. Instale as dependências:

   ```bash
   yarn
   ```

4. Configure as variáveis de ambiente no arquivo `.env`:

   ```bash
   PORT=
   NODE_ENV=
   IS_LOCALHOST=
   JWT_SECRET=
   ```

 <!-- Para produção -->

    DATABASE_HOST=
    DATABASE_USER=
    DATABASE_DATABASE=
    DATABASE_PASSWORD=
    DATABASE_PORT=
    DATABASE_CLIENT=
    ```

5. Execute as migrações do banco de dados:

   ```bash
   yarn knex:migrate
   ```

6. Inicie o servidor de desenvolvimento:

   ```bash
   yarn dev
   ```

## Configuração do Frontend

1. Navegue até o diretório do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   yarn
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   yarn dev
   ```

4. Acesse o aplicativo no seu navegador em `http://localhost:5173`.

## Scripts Disponíveis

### Backend

- `yarn dev`: Inicia o servidor em modo de desenvolvimento.
- `yarn knex:migrate`: Executa as migrações do banco de dados.
- `yarn knex:rollback`: Reverte a última migração do banco de dados.
- `yarn knex:seed`: Popula o banco de dados com dados iniciais.

### Frontend

- `yarn dev`: Inicia o servidor de desenvolvimento com Vite.
- `yarn build`: Cria uma build de produção do projeto.
- `yarn preview`: Serve a build de produção para visualização local.
- `yarn lint`: Executa o ESLint para checagem de estilo de código.

## Conclusão

Este README fornece as informações necessárias para configurar e rodar tanto o frontend quanto o backend do aplicativo de gerenciamento de notas. Sinta-se à vontade para ajustar as variáveis de ambiente e configurações conforme necessário.
