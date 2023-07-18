const express = require("express");
const loanController = require("../controllers/loanController");

const router = express.Router();

router.route("/").get(loanController.getLoans).post(loanController.createLoan);

module.exports = router;
