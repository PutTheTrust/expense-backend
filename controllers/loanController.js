const Loan = require("../models/loanModel");
const User = require("../models/userModel");

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.params.userId });

    res.status(200).json({
      status: "success",
      length: loans.length,
      data: {
        loans,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.createLoan = async (req, res) => {
  try {
    const userId = await User.findOne({ _id: req.body.userId });
    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "Please login",
      });
    }

    const newLoan = await Loan.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        newLoan,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    await Loan.deleteOne({ _id: req.body.loanId });

    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateLoan = async (req, res) => {
  try {
    await Loan.findByIdAndUpdate(req.body.id, req.body);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMonthlyController = async (req, res) => {
  try {
    const uId = req.params.userId;
    const categories = await Loan.aggregate([
      {
        $match: {
          userId: { $eq: uId },
        },
      },
      { $group: { _id: "$lender", y: { $sum: "$amount" } } },
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
