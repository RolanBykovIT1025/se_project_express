const router = require("express").Router();

const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const itemRouter = require("./clothingItem");
const {
  validateSignup,
  validateSignin,
} = require("../middlewares/validation");

const { NotFoundError } = require("../utils/errors");

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
