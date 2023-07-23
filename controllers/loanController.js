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
    // console.log(req.body);
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
