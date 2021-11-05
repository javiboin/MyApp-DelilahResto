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
 *      description: Introduzca el Nombre de Usuario 
 *      in: formdata
 *      required: true
 *      type: string
 *      example: fulanito33
 *    - name: password
 *      description: Introduzca su Contraseña de usuario
 *      in: formdata
 *      required: true
 *      type: string
 *      example: miContrasenniaSecreta! 
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