const mongoose = require("mongoose");

const loanSchema = mongoose.Schema({
  lender: {
    type: String,
    required: [true, "Lender name is required"],
  },
  borrowDate: {
    type: Date,
    required: [true, "Borrow date is required"],
  },
  due: {
    type: Date,
    required: [true, "Loan Due Date is required"],
  },
  status: {
    type: String,
    required: [true, "Status of the loan is required"],
  },
  userId: {
    type: String,
    required: [true, "Please login"],
  },
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
