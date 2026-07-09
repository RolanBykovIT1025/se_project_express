const router = require("express").Router();

const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateCreateItem,
  validateId,
} = require("../middlewares/validation");

// CRUD

// Public route - Read items
router.get("/", getItems);

// Protected routes - require authentication
router.post("/", auth, validateCreateItem, createItem);
router.patch("/:itemId", auth, validateId, updateItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId", auth, validateId, deleteItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
