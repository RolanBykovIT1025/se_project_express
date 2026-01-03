const router = require('express').Router();

const { createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems')

//CRUD

//Create
router.post('/', createItem);

//Read
router.get('/', getItems);

//Delete
router.delete('/:itemId', deleteItem);

//Like
router.put('/items/:itemId/likes', likeItem);

//Unlike
router.delete('/items/:itemId/likes', dislikeItem);

module.exports = router;