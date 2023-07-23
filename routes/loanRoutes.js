const express = require("express");
const loanController = require("../controllers/loanController");

const router = express.Router();

router
  .get("/:userId", loanController.getLoans)
  .post("/", loanController.createLoan);

module.exports = router;
