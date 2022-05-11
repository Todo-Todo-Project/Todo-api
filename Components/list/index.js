const express = require('express');
const router = express.Router();
const listsController = require('./listController')

router.get('/:ownerId', listsController.lists);

router.get('/list/:listId', listsController.listByListId);

router.post('/',listsController.create);

router.put('/', listsController.updateName);

router.delete('/', listsController.delete);

// router.get('/lists/:listEmail', listsController.getListByEmail);

module.exports = router;