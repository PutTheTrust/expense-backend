const express = require("express");
const loanController = require("../controllers/loanController");

const router = express.Router();

router
  .get("/:userId", loanController.getLoans)
  .post("/", loanController.createLoan)
  .delete("/", loanController.deleteLoan)
  .patch("/", loanController.updateLoan);

router.get("/group/:userId", loanController.getMonthlyController);

router.get("/totals/total/:userId", loanController.getTotal);

module.exports = router;
