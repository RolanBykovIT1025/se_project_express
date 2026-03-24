const router = require("express").Router();
const { updateProfile, createUser, getCurrentUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);
router.post("/signup", auth, createUser);
router.post("/signin", auth, login);

module.exports = router;