const Loan = require("../models/loanModel");

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();

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
