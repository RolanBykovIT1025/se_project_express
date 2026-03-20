import config from './config.js';

const User = require("../models/user");
const { BAD_REQUEST, SERVER_ERROR, NOT_FOUND } = require("../utils/errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  salt = bcrypt.genSalt(saltRounds, (err) => {
    if (err) {
      // Handle error
      return;
    }

    // Salt generation successful, proceed to hash the password
  });
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      // Handle error
      return;
    }

    // Hashing successful, 'hash' contains the hashed password
    console.log("Hashed password:", hash);
  });

  User.create({ name, avatar, email, hash })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (error.code === 11000) {
        return res
          .status(409)
          .send({ message: "This email is already in use" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
      });
      return token;
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
