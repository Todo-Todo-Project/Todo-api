const todosModel = require('./todosModel');
const { db } = require('../../models/db');
const { TODOS } = require('../../models/collections');
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


function getValueForNextSequence(Sequence){
	var SequenceDoc = db().collection(TODOS).findAndModify({
		query: {_id: Sequence},
		update: {$inc: {sequenceValue: 1}},
		new: true,
	});
	return SequenceDoc.sequenceValue;
}