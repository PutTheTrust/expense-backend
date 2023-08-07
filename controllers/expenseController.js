const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
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
    const userId = await User.findOne({ _id: req.body.userId });
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

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.body.expenseId });

    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateExpense = async (req, res) => {
  try {
    await Expense.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMonthlyExpenses = async (req, res) => {
  try {
    const uId = req.params.userId;
    const categories = await Expense.aggregate([
      {
        $match: {
          userId: { $eq: uId },
        },
      },
      { $group: { _id: "$category", y: { $sum: "$price" } } },
      {
        $project: {
          _id: 0,
          x: "$_id",
          y: 1,
        },
      },
    ]);

    res.status(201).json({
      status: "hit",
      results: categories.length,
      categories,
    });
  } catch (e) {
    console.log(e);
  }
};
