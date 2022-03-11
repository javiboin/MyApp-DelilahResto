require('dotenv').config();

const app = require('./server');
const connection = require("./config/db.config");
const PORT = process.env.PORT || 3000;
const host = 'http://localhost'
const URL = `${host}:${PORT}`;

// SETEAR CABECERAS, REVISAR SI ESTE COMPORTAMIENTO SUCEDE EN CADA ENDPOINT
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Por ahi sacando esto, no modifique el comportamiento del backend

// SETEAR EL NOMBRE DEL SERVIDOR
app.set('apiname', 'Delilah Resto API');
app.get('/', (req, res) => {
  res.send("Delilah Resto papa!");
});

// PRENDER SERVIDOR Y CONECTAR BASE DE DATOS
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
