const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    // console.log(expenses);
    // console.log(req.params);
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
    console.log(req.body);
    const userId = await User.findOne({ _id: req.body.userId });
    console.log(userId);
    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "Please login",
      });
    }
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
