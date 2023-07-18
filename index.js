const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT | 3000;

app.get("/", (req, res) => {
  try {
    res.status(404).send({
      status: "success",
      messege: "Expense tracker",
    });
  } catch (e) {
    console.log(e.messege);
  }
});

app.listen(port, () => {
  console.log(`Port running on ${port}`);
});
