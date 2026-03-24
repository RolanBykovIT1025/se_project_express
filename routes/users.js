const router = require("express").Router();
const { updateProfile, createUser, getCurrentUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

// Public routes (no authentication required)
router.post("/signup", createUser);
router.post("/signin", login);

// Protected routes (authentication required)
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);

module.exports = router;