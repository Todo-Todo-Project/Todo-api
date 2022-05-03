const todosModel = require('./todosModel');
const { db } = require('../../models/db');
const { TODOS } = require('../../models/collections');
const { ObjectId } = require('mongodb');
exports.list = async () => {
	const todos = await todosModel.list();
	if (todos) return todos;

	return null;
};

exports.delete = async (todoId) => {
	const result = await todosModel.delete(todoId);
	if (result.deletedCount) return result;

	return null;
};

exports.update = async (todoId, newBody) => {
	const result = await todosModel.update(todoId, newBody);
	if (result.modifiedCount) return result;

	return null;
}

exports.create = async (newBody) => {
	const result = await todosModel.create(newBody);
	console.log('sevices' + result)
	if (result.insertedId){
		// 
		return result;
	}

	return null;
};

exports.getTodoByEmail = async (body) => {
	const todos = await todosModel.list();
	const arr = [];
	for(let i = 0; i < todos.length; i++){
		if(todos[i].email === body.email){
			// console.log(todos[i].email)
			arr.push(todos[i])
		}
		// console.log("Result: " + body.email);
	}
	console.log(arr)	
	return arr;
}

exports.getTodoById = async (todoId) => {
	const todos = await todosModel.list();
	const temp = [];
	for(let i = 0; i < todos.length; i++){
		// console.log(todos[i]._id.equals(todoId));
		// console.log(new ObjectId(todoId))
		// if(todos[i]._xid == new ObjectId(todoId))
			// temp.push(todos[i])
			// console.log("asadakdnladnals")
		if(todos[i]._id.equals(todoId))
			temp.push(todos[i])
	}
	console.log(temp)
	return temp;
}

function getValueForNextSequence(Sequence){
	var SequenceDoc = db().collection(TODOS).findAndModify({
		query: {_id: Sequence},
		update: {$inc: {sequenceValue: 1}},
		new: true,
	});
	return SequenceDoc.sequenceValue;
}