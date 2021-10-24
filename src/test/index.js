const assert = require('assert');
const fetch = require('node-fetch');
/* import fetch from 'node-fetch'; */

const prueba = require('../prueba/index');

describe('Probando API', () => {
  it(`API responde 200`, async () => {
    const url = `http://localhost:3030/api-docs/`;
    await fetch(url)
    .then(response => {
      assert.equal(response.status, 200);
    });
  });
});




