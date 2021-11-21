const express = require('express');
const router = express.Router();
const functions = require('../controllers/user.controller');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *    - "Login"
 *    summary: "Ingresa a nuestra app"
 *    description: Autentica el ingreso a la app
 *    parameters:
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      default: daveG
 *    - name: password
 *      description: Contraseña de Usuario. En esta API de pruebas, todas las contraseñas son "12345"
 *      in: formData
 *      required: true
 *      type: string
 *      default: 12345
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

  router.post('/', (req, res) => {
    functions.login(req.body)
    .then((result) => {
      res.status(200).send({
        status: 200,
        message: "Login OK",
        data: result
      });
    })
    .catch(() => {
      res.status(404).send({
        message: "El usuario y/o la contraseña son incorrectos",
        status: 404
      });
    });
  });

module.exports = router;