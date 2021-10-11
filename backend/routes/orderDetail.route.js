const express = require('express')
const router = express.Router()

const orderDetailController = require("../controllers/orderDetailController");

router.get("/", (req, res) => {
  orderDetailController.listValues()
  .then((result) => {
    res.status(200).send({
      status: 200,
      message: "Data find Successfully",
      data: result
    });
  })
  .catch(error => {
    res.status(404).send({
      message: "Unable to find data",
      errors: error,
      status: 404
    });
  });
});

module.exports = router;