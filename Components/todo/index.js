const express = require('express');
const router = express.Router();
const todosController =  require('./todosController')
/* GET home page. */
router.get('/', todosController.list);

router.post('/', todosController.create);

router.put('/:id', todosController.update);

/* DELETE a todo */
router.delete('/:id', todosController.delete)

module.exports = router;