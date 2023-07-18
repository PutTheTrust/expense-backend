const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const expenseRouter = require("./routes/expenseRoutes");

const port = process.env.PORT | 3000;

app.use(express.json());

app.use("/api/v1/expenses", expenseRouter);
mongoose
  .connect(process.env.CONNECTION)
  .then(() => console.log("DB connection successful!"));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
