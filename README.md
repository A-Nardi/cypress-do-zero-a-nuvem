# cy-data-test

## Projeto simples para demonstrar um cy.dataTest
Projeto de exemplo para demonstrar um comando personalizado cy.dataTest do Cypress.

## Pré-requisitos
É necessário ter o Node.js e o npm instalados para executar este projeto.
Usei as versões v18.15.0 e 9.5.0 do Node.js e do npm, respectivamente. Sugiro que você use a mesma versão ou versões posteriores.

## Installation
Execute npm install (ou npm i para a versão abreviada) para instalar as dependências de desenvolvimento.
Tests

### Observação sobre os testes: 
Antes de executar os testes, faça uma cópia do arquivo cypress.env.example.json como cypress.env.json, que, no mundo real, você atualizaria com credenciais válidas.

O arquivo cypress.env.json está incluído no .gitignore e você tem certeza de que informações confidenciais não serão versionadas.
Execute npm test (ou npm t para a versão resumida) para executar o teste no modo headless.
Ou execute npm run cy:open para abrir o Cypress no modo interativo.

### Este projeto foi criado e instruido por [Walmyr](https://walmyr.dev)

E realizado através do curso [Cypress, do Zero à nuvem](https://www.udemy.com/course/testes-automatizados-com-cypress-basico/?referralCode=5E367E0C332F3B967B6C&couponCode=ST18MT170625B), por [André Nardi](https://github.com/A-Nardi).
