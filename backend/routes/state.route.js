const express = require('express')
const router = express.Router()

const stateController = require("../controllers/state.controller");

router.get("/", (req, res) => {
  stateController.listStates()
  .then((result) => {
    res.status(200).send({
      status: 200,
      message: "Data find Successfully",
      data: result
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to find data",
      errors: error,
      status: 400
    });
  });
});

module.exports = router;