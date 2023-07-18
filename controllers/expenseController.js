const Expense = require("../models/expenseModel");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json({
      status: "success",
      results: expenses.length,
      data: {
        expenses,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.createExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newExpense,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
