const express = require('express');
const router = express.Router();
const todosController =  require('./todosController')
/* GET home page. */
router.get('/', todosController.list);

router.get('/:ownerId', todosController.listByOwnerId);

router.post('/', todosController.create);

router.put('/:id', todosController.update);

router.get('/listtodo/:email', todosController.getTodoByEmail);

router.get('/todo/:id', todosController.getTodoById);

/* DELETE a todo */
router.delete('/:id', todosController.delete)

module.exports = router;