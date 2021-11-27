# My App - Delilah Resto

## Install Libraries:
```
npm i 
```
## Install Database:

Importar archivo db/dellilah.db in MySQL Databases Location (C:\xampp\mysql\data) 

En el Archivo .env definir el nombre de las base de datos. 
Por defecto su nombre es delilla_resto

```

DB_HOST=localhost
DB_PORT=3306
PORT=3030
DB_USER=root
DB_PASSWORD=
MYSQL_DELILAH_DB_NAME=delilla_resto

JWT_SECRET=clavesegura

```
## Start Server:

```bash
npm run start
node src/index.js
nodemon src/index.js
```

## View Redis:
```Redis
npm run redis
```

## View Mocha:
```MochaJs
npm run rest
```

## Swagger:
```
http://localhost:3030/api-docs
```
## GitHub:
```
https://github.com/javiboin
```