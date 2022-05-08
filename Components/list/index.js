const express = require('express');
const router = express.Router();
const listsController = require('./listController')

router.get('/:ownerId', listsController.list);

router.post('/',listsController.create);

router.put('/:listId', listsController.update);

router.delete('/:listId', listsController.delete);

// router.get('/lists/:listEmail', listsController.getListByEmail);

module.exports = router;