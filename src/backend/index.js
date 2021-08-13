const app = require('./server');

const PORT = 3001;
const host = 'http://localhost'
const url = `${host}:${PORT}`;

app.listen(PORT, () => console.log(`Listen on ${url}`));