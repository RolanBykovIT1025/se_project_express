const router = require("express").Router();
const clothingItem = require('./clothingItem');

const userRouter = require("./users");
const itemRouter = require("./clothingItem");

const { NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

router.use('/items', itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Router not found'})
});

module.exports = router;
