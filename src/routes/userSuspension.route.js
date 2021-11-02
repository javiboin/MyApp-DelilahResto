const express = require('express')
const router = express.Router()

const userSuspensionController = require("../controllers/userSuspension.controller");
const all = require('../middlewares/all.middleware');

router.get("/", all.isAdmin, (req, res) => {
  userSuspensionController.listValues()
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

router.post("/", all.isAdmin, (req, res) => {
  userSuspensionController.createUserSuspension(req)
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

router.put("/:id", all.isAdmin,(req, res) => {
  userSuspensionController.updateUserSupension(req)
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

router.delete("/:id", all.isAdmin, (req, res) => {
  userSuspensionController.deleteUserSupension(req)
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

router.get("/:id", all.isAdmin, (req, res) => {
  userSuspensionController.listUserSupensionById(req)
  .then((result) => {
    console.log(result);
    if (res) {
      res.status(404).send({
        message: "Suspension not found",
        errors: error,
        status: 404
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "Data find Successfully",
        data: result
      });
    }
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