const router = require('express').Router();

const auth = require("../middlewares/auth");
const { createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems')

//CRUD

//Create
router.post('/', auth, createItem);

//Read
router.get('/', getItems);

//Delete
router.delete('/:itemId', auth, deleteItem);

//Like
router.put('/:itemId/likes', auth, likeItem);

//Unlike
router.delete('/:itemId/likes', auth, dislikeItem);

module.exports = router;