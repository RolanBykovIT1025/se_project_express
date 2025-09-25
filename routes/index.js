const router = require("express").Router();
const clothingItem = require('./clothingItem');

const userRouter = require("./users");
const itemRouter = require("./clothingItem");

router.use('/items', itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(500).send({ message: 'Router not found'})
});

module.exports = router;
