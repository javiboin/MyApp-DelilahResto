require('dotenv').config();

const app = require('./server');
const connection = require("./config/db.config");
const PORT = process.env.PORT || 3000;
const host = 'http://localhost'
const URL = `${host}:${PORT}`;

app.set('apiname', 'Delilah Resto API');
app.get('/', (req, res) => {
  console.log("hola");
  res.send("Hello World");
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

