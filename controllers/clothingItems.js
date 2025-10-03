const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(SERVER_ERROR).send({ message: "Error from createItem" });
    });
};

const getItems = (req, res) => {
  ClothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      res.status(SERVER_ERROR).send({ message: "Error from getItems" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error from updateItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => res.status(204).send({}))
  .catch((e) => {
    if (err.name === "DocumentNotFoundError") {
      res.status(NOT_FOUND).send({ message: "Document not found." });
    } else if (err.name === "CastError") {
      res.status(BAD_REQUEST).send({ message: "Unable to find request"});
    } else {
      res.status(SERVER_ERROR).send({ message: "Something went wrong." });
    }
  });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};