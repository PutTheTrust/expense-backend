const express = require("express");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router
  .get("/:userId", expenseController.getAllExpenses)
  .post("/", expenseController.createExpense);

module.exports = router;
