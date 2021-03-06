const { restart } = require('nodemon');
const todosService = require('./todosServices')

exports.list = async (req, res) => {
	const todos = await todosService.list();
	if (todos.length !== 0) {
		res.status(200).json(todos);
	} else {
		res.status(404).json({ message: 'Error! Not found!' });
	}
};

exports.delete = async (req, res) => {
	const todo = await todosService.delete(req.params.id);
	if (todo) {
		res.status(200).json({ message: 'Successfully deleted one todo.' });
	} else {
		res.status(404).json({ message: 'Error!' });
	}
};

exports.update = async (req, res) => {
	const updateOne = await todosService.update(req.params.id, req.body);
	if (updateOne) {
		res.status(200).json({ message: 'Successfully update todo.' });
	} else {
		res.status(404).json({ message: 'Error!' });
	}
};

exports.create = async (req, res) => {
	const insertOne = await todosService.create(req.body);
	console.log('control ' + res.body)
	if (insertOne) {
		res.status(200).json({ message: 'Successfully create new todo.' });
	} else {
		res.status(500).json({ message: 'Error!' });
	}
};

exports.getTodoByEmail = async (req, res) => {
	const listTodoByEmail = await todosService.getTodoByEmail(req.body);
	if(listTodoByEmail)
		res.status(200).json(listTodoByEmail);
	else
		res.status(500).json({message: 'Error'});
}


exports.getTodoById = async (req, res) => {
	const todoById = await todosService.getTodoById(req.params.id);
	if(todoById)
		res.status(200).json(todoById);
	else	
		res.status(500).json({message: 'Errors'});
}

exports.listByOwnerId = async (req, res) => {
	const todos= await todosService.listByOwnerId(req.params.ownerId)
	if(todos) {
		res.status(200).json(todos);
	}
	else {
		res.status(500).json({message: 'Errors'});
	}
}

exports.listByListId = async (req, res) => {
	const todos= await todosService.listByListId(req.params.listId)
	if(todos) {
		res.status(200).json(todos);
	}
	else {
		res.status(500).json({message: 'Errors'});
	}
}