const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "An expense should have a name"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "An expense needs a price"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  userId: {
    type: String,
    required: [true, "Please login"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
