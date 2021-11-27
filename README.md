# My App - Delilah Resto

## 1.Install Database:

1) Importar archivo db/dellilah.db en su administrador de base de datos 
```
db\delilla_resto.sql
```

2) En el Archivo .env definir el nombre de las base de datos. 
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
## 2.Install Libraries:
```
npm i 
```
## 3.Start Server:
```bash
npm run start
```
## 4.Swagger:
```
http://localhost:3030/api-docs
```
## 5.View Redis Commander:
Para ver la memoria cache del sistema
Utilizar el comando para inicializar:
```Redis
npm run redis
```
Luego, entrar al endpoint:
```
http://127.0.0.1:8081
```
## 6.View Mocha:
Ver pruebas unitarias
```MochaJs
npm run rest
```
## GitHub:
Repositorio en GitHub
```
https://github.com/javiboin
```