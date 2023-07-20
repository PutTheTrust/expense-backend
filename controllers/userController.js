const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      messege: "User created successfully",
      token,
      data: {
        newUser,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
