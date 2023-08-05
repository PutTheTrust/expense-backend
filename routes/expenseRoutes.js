const express = require("express");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router
  .get("/:userId", expenseController.getAllExpenses)
  .post("/", expenseController.createExpense)
  .delete("/", expenseController.deleteExpense)
  .patch("/", expenseController.updateExpense);

router.get("/group/:userId", expenseController.getMonthlyExpenses);
module.exports = router;
