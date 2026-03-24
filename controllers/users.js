import config from "./config.js";

const User = require("../models/user");
const {
  BAD_REQUEST,
  SERVER_ERROR,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      return User.create({
        name,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;

      return res.status(201).send(userObj);
    })
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res
          .status(CONFLICT)
          .send({ message: "This email is already in use" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(SERVER_ERROR).send({ message: "Something went wrong" });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid user ID format" });
      }
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
      });
      return token;
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: req.params.name, avatar: req.params.avatar } },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

module.exports = { login, createUser, getCurrentUser, updateProfile };
