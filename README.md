## Running Locally

### Prerequisites

#### 1. Node Version 14.5.0

```
node --version
// v14.5.0
```

#### 2. Install doppler

You'll need the environment variables for Amazon Cognito. Doppler is a secret management service. Email danielrasmuson@gmail.com for access to the SWCCGDB vault.

https://docs.doppler.com/docs/enclave-installation

#### 3. Start an instance of MySQL locally

A running mysql database

Make a new database on the instance

```
mysql
> CREATE DATABASE swccgdb;
```

next from the root of the project build the schema

```
mysql --host=127.0.0.1 --port=3306 --user=root -p "swccgdb" < "sql/schema.sql"
```

next make a new file "prisma/.env"

with the contents (assuming you used the above commands to setup your database)

```
DATABASE_URL="mysql://root:password@localhost:3306/swccgdb"
```

### Setup commands

```
npm i -g yarn // install yarn globally
yarn // to install dependencies
yarn run dev
```

## After Updating the Database Schema Locally

```
npx prisma introspect
npx prisma generate
```

read more about this here: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-sql-typescript-postgres
