const router = require("express").Router();

const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const itemRouter = require("./clothingItem");

const { NOT_FOUND } = require("../utils/errors");

router.use('/items', itemRouter);
router.use("/users", userRouter);

router.post("/signup", createUser);
router.post("/signin", login);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Router not found'});
});

module.exports = router;
