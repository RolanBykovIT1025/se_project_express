const router = require("express").Router();
const {
  updateProfile,
  getCurrentUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUpdateProfile,
} = require("../middlewares/validation");

// Protected routes (authentication required)
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateProfile, updateProfile);

module.exports = router;
