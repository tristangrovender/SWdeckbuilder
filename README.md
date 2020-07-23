## Running Locally

### Prerequisites

#### 1. Node Version 14.5.0

```
node --version
// v14.5.0
```

#### 2. Start an instance of PostgresQL locally

A running postgresql database

- Here is a guide if you want help https://www.prisma.io/docs/guides/database-workflows/setting-up-a-database/postgresql

Make a new database and user on the postgres instance.

```
psql
> CREATE DATABASE swccgdb;
> create user root with encrypted password 'password';
> grant all privileges on database swccgdb to root;
```

next from the root of the project build the schema

```
psql -h localhost -d swccgdb -U root -f sql/schema.sql
```

next make a new file "prisma/.env"

with the contents (assuming you used the above commands to setup your database)

```
DATABASE_URL="postgresql://root:password@localhost:5432/swccgdb?schema=public"
```

### Setup commands

```
npm i -g yarn // install yarn globally
yarn // to install dependencies
yarn run dev
```
