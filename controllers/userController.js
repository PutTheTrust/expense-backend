const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id, name) => {
  return jwt.sign({ id: id, name: name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const checkDb = await User.findOne({ email });

    if (checkDb) {
      // return res.json({
      //   status: "fail",
      //   message: "Email already exists",
      // });
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    const token = signToken(newUser._id, newUser.name);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      data: {
        newUser,
      },
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      //   return next(new AppError('Incorrect email or password', 401));
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    // 3) If everything is ok, send to client

    const token = signToken(user._id, user.name);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: e.message,
    });
  }
};
