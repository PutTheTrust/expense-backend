const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expense-backend-beta.vercel.app/",
    ],
  })
);

const expenseRouter = require("./routes/expenseRoutes");
const loanRouter = require("./routes/loanRoutes");
const userRouter = require("./routes/userRoutes");

const port = process.env.PORT | 3000;

app.use(express.json());

app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/loans", loanRouter);
app.use("/api/v1/auth", userRouter);

mongoose
  .connect(process.env.CONNECTION)
  .then(() => console.log("DB connection successful!"));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
