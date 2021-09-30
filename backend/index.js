
require('dotenv').config();
const app = require('./server');
const connection = require("./config/db.config");
const PORT = process.env.PORT || 3030;
const host = 'http://localhost'
const url = `${host}:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connection.authenticate().then(() => {
      console.log('BBDD conectada');
  }).catch((err) => {
      console.log('BBDD error', err);
  })
});