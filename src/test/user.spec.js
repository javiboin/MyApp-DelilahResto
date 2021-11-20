require('dotenv').config();

const assert = require('assert');
const fetch = require('node-fetch');

const URL = `http://localhost:${process.env.PORT}`;

before(() => console.log('Test Rutine Users POST'));

describe('Enpoint /POST', () => {
  it('Is Working', async () => {
    await fetch(`${URL}/users`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({a: 1, b: 2})
    })
      .then(response => {
        assert.equal(response.status,403); 
        // API fuciona pero no es un usuario autenticado
      });
  });
});

