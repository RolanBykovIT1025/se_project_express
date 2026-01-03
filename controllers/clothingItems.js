const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else {
        res.status(SERVER_ERROR).send({ message: "server error" });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(SERVER_ERROR).send({ message: "Error from getItems" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
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
    .then((item) => res.status(200).send({}))
    .catch((err) => {
      if (err.name === "documentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Document not found." });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Unable to find request" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Something went wrong." });
      }
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
  { new: true },
)
  .orFail()
  .then((item) => res.status(200).send({ data: item }))
  .catch((err) => {
    if (err.name === "documentNotFoundError") {
      res.status(NOT_FOUND).send({ message: "item not found" });
    } else if (err.name === "CastError") {
      res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
    } else {
      res.status(SERVER_ERROR).send({ message: "Server error"});
    }
  });
};


const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
  .orFail()
  .then((item) => res.status(200).send({ data: item }))
  .catch((err) => {
    if (err.name === "documentNotFoundError") {
      res.status(NOT_FOUND).send({ message: "Item not found" });
    } else if (err.name === "CastError") {
      res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
    } else {
      res.status(SERVER_ERROR).send({ message: "Server error"});
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
