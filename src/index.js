require('dotenv').config();

const app = require('./server');
const connection = require("./config/db.config");
const PORT = process.env.PORT || 3001;
const host = 'http://localhost'
const URL = `${host}:${PORT}`;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.set('apiname', 'Delilah Resto API');
app.get('/', (req, res) => {
  res.send("Delilah Resto papa!");
});

(async () =>{
   app.listen(PORT, () => {
    console.log(app.get('apiname'));
    console.log(`Server is running on port ${URL}.`);
    connection.authenticate().then(() => {
        console.log('BBDD conectada');
    }).catch((err) => {
        console.log('BBDD error', err);
    })
  });
})();

// probando conexion desde VSCode
