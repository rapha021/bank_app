# Instruções para funcionamento

Instructions to install

## Installation API

> Use o yarn para intalar as dependencias.

> Use yarn to install dependencies.

```bash
cd server
```

```bash
yarn install
```

## Docker

> Migrations automática

```bash
docker compose up --build
```

## Without Docker

```bash
yarn dev
```

Certifique-se de ter um banco de dados postgresql rodando localmente e o arquivo .env com as informações corretas.

Please make sure you have a postgresql database running locally and the .env file with the correct information.

## Installation Front end

```bash
cd web
```

```bash
yarn install
```

```bash
yarn dev
```

Certifique-se de estar na pasta correta.

Please make sure to be in the correct folder.
