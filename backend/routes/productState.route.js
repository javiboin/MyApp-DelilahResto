const express = require('express')
const router = express.Router()

const productStateController = require("../controllers/productState.controller");

router.get("/", (req, res) => {
  productStateController.listValues()
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

router.post("/", (req, res) => {
  productStateController.createProductState(req)
  .then(() => {
    res.status(200).send({
      status: 200,
      message: "Data Save Successfully",
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 400
    });
  });
});

router.put("/:id",(req, res) => {
  productStateController.updateProductState(req)
  .then(() => {
    res.status(200).send({
      status: 200,
      message: "Data Update Successfully",
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to Update data",
      errors: error,
      status: 400
    });
  });
});

router.delete("/:id", (req, res) => {
  productStateController.deleteProductState(req)
  .then(() => {
    res.status(200).send({
      status: 200,
      message: "Data Delete Successfully",
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to Delete data",
      errors: error,
      status: 400
    });
  });
});

router.get("/:id", (req, res) => {
  productStateController.listProductStateById(req)
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