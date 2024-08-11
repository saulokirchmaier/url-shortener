
# Encurtador de URLs

## Descrição

Projeto de encurtador de URLs realizado como teste prático para a [Teddy Open Finance](https://teddydigital.io)

## Sobre o projeto

### Descrição e informações de desenvolvimento

- Deverá ser implementado um projeto com NodeJS na última versão estável, sendo construído como API REST. Leve em consideração que o sistema será implementado em uma infraestrutura que escala verticalmente.
- O sistema deve possibilitar o cadastro de usuários e autenticação dos mesmos.
- O sistema deve possibilitar que a partir de um url enviado, ele seja encurtado para no máximo 6 caracteres. Exemplo:
  * Entrada: https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/
  * Saída: http://localhost/aZbKq7
- Qualquer um pode solicitar que o URL seja encurtado e para encurtar deve existir apenas um endpoint, mas caso seja um usuário autenticado, o sistema deve registrar que o URL pertence ao usuário. 
- Um usuário autenticado pode listar, editar o endereço de destino e excluir URLs encurtadas por ele.
- Todo acesso a qualquer URL encurtado deve ser contabilizado no sistema.
- Quando um usuário listar os urls deve aparecer na listagem a quantidade de cliques.
- Todos os registros devem ter uma forma de saber quando foram atualizados.
- Os registros só poderão ser deletados logicamente do banco, ou seja, deverá ter um campo que guarda a data de exclusão do registro, caso ela esteja nula é porque ele é válido, caso esteja preenchida é porque ele foi excluído e nenhuma operação de leitura ou escrita pode ser realizada por ele.

#### Sobre a entrega:

- Construir uma estrutura de tabelas que faça sentido para o projeto usando um banco relacional.
- Construir endpoints para autenticação de e-mail e senha que retorna um Bearer Token.
- Construir apenas um endpoint para encurtar o URL, ele deve receber um URL de origem e deve aceitar requisições com e sem autenticação, deve retornar o url encurtado - incluindo o domínio.
- Definir o que deve e não deve ser variável de ambiente..
- Construir endpoints que aceitam apenas requisições autenticadas:
  * Listagem de URL Encurtados pelo usuário com contabilização de clicks
  * Deletar URL Encurtado
  * Atualizar a origem de um URL encurtado.
- README ou CONTRIBUTING explicando como rodar o projeto.
- Construir um endpoint que ao receber um URL encurtado, redirecione o usuário para o URL de origem e contabilize.
- Maturidade 2 da API REST


### Tecnologias

Para este projeto foram utilizadas as seguintes tecnologias:

- [NodeJS](https://nodejs.org/pt).
- [NestJS](https://github.com/nestjs/nest) como framework de backend.
- [Docker](https://www.docker.com) para conteinerização.
- [PostgreSQL](https://www.postgresql.org) para o banco de dados relacional.
- [Swagger](https://swagger.io) para a documentação da API.

## Utilização

### Requisitos

Antes de rodar o projeto tenha certeza de estar com as seguintes tecnologias instaladas no seu PC:

- [NodeJS](https://nodejs.org/pt) na versão 20 ou superior.
- [NestJS](https://docs.nestjs.com/first-steps) de forma global.
- [Docker Engine](https://docs.docker.com/engine/install/) no Linux ou [Docker Desktop](https://www.docker.com/products/docker-desktop/) no Windows ou Mac.

### Instalando

#### Baixando

- Faça um clone em seu computador, no terminal digite:
  1. HTTPS:
    ```bash 
      $ git clone https://github.com/saulokirchmaier/url-shortener.git
    ```
  2. SSH: 
    ```bash
      $ git clone git@github.com:saulokirchmaier/url-shortener.git
    ```

#### Rodando

- Tenha certeza de estar com docker engine rodando em sua máquina, ou com o docker desktop iniciado.
- Entre na pasta do projeto:
  ```bash 
    cd url-shortener
  ```
- adicione as variáveis de ambiente em um arquivo `.env` na raiz do projeto seguindo o exemplo:
  ```
    PORT=3001
    LOCALHOST_URL=http://localhost/
    HOST=localhost
    DATABASE_HOST=db
    DATABASE_PORT=5432
    DATABASE_USER=usuario
    DATABASE_PASSWORD=senha
    DATABASE_NAME=url_shortener
    CONSTAINER_DB_NAME=postgres_db
    JWT_SECRET='segredo-do-jwt'
    JWT_EXPIRES_IN='60d'
  ```
- Rode o comando: 
  ```bash
    docker compose up
  ```
- Espere a instalação das imagens dos containers serem concluídas e o sistema ser iniciado, até aparecer no terminal:
  ```bash
    Server is running on PORT 3001
  ```

#### Utilizando

Com o sistema iniciado abra a documentação da API no google chrome http://localhost:3001/api para pode utilizar.

#### Observações

- Inicialmente ao se gerar o link encurtado, retornava somente a nova url, porém entendi que seria mais adequado retornar um objeto com a url para ter um padrão melhor.
- Adicionei ao package um limite máximo de memoria para um consumo menor do valor do ambiente de deploy.

### Melhorias futuras

- Adicionar roles de usuários, podendo ser administradores do sistema, os quais podem editar e deletar links de usuários comuns.
- Escrever testes unitários e de integração.
