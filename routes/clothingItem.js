const router = require('express').Router();

const auth = require("../middlewares/auth");
const { createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems')

// CRUD

// Public route - Read items
router.get('/', getItems);

// Protected routes - require authentication
router.post('/', auth, createItem);
router.patch('/:itemId', auth, updateItem);
router.put('/:itemId/likes', auth, likeItem);
router.delete('/:itemId', auth, deleteItem);
router.delete('/:itemId/likes', auth, dislikeItem);

module.exports = router;