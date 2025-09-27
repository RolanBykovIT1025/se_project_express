const router = require('express').Router();

const { createItem, getItems, updateItem, deleteItem } = require('../controllers/clothingItems')

//CRUD

//Create
router.post('/', createItem)

//Read
router.get('/', createItem);

//Update
router.put('/items/:itemId', updateItem)

//Delete
router.delete('/:itemid', deleteItem)

module.exports = router;