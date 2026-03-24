const clothingitem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingitem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else {
        res.status(SERVER_ERROR).send({ message: "server error" });
      }
    });
};

const getItems = (req, res) => {
  clothingitem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(SERVER_ERROR).send({ message: "Error from getItems" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  clothingitem
    .findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(SERVER_ERROR).send({ message: "Error from updateItem", e });
    });
};

const mongoose = require("mongoose");

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
  }

  clothingitem
    .findById(itemId)
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(FORBIDDEN)
          .send({ message: "Forbidden Fruit! Invalid!" });
      }
      return clothingitem
        .deleteOne({ _id: itemId })
        .then(() => res.status(200).send({}));
    })
    .catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Something went wrong." });
    });
};

const likeItem = (req, res) => {
  clothingitem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true }
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

const dislikeItem = (req, res) => {
  clothingitem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
