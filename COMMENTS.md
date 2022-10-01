# Requisitos

The specifications was taken from [https://github.com/grupo-a/challenge-full-stack-web].

## 1 - [back-end]
## Instalação e configuração

**IMPORTANTE**
Versão usada do node: 14.20

Instalando as dependências
```bash
$ yarn
```

Criando as chaves para autenticação e autorização
```bash
$ openssl genrsa -des3 -out private.pem 2048
$ openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

Criando o banco localmente e rodando as migrations
```bash
$ docker-compose up -d
$ yarn migration:run:dev
```

Crie o arquivo .env na raiz do projeto e copie o conteudo do .env.example para ele
(AUTH_PASSPHRASE é a frase usada na geração das chaves de autenticação e autorizaçao)

Rodando a aplicação
```bash
$ yarn dev
```

Rodando os testes unitários
```bash
$ yarn test
```

## 2 - [front-end]
## Instalação e configuração

Instalando as dependências
```bash
$ yarn
```

Crie o arquivo .env.development na raiz do projeto e copie o conteudo do .env.example para ele

Rodando a aplicação
```bash
$ yarn serve
```
