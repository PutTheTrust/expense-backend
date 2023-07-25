const express = require("express");
const loanController = require("../controllers/loanController");

const router = express.Router();

router
  .get("/:userId", loanController.getLoans)
  .post("/", loanController.createLoan)
  .delete("/", loanController.deleteLoan);

router.get("/group/:userId", loanController.getMonthlyController);

module.exports = router;
