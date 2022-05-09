const { ObjectId } = require('mongodb');
const { TODOS } = require('../../models/collections');
const { db } = require('../../models/db');

exports.list = async () => {
	try {
		const todos = await db().collection(TODOS).find().toArray();
		return todos;
	} catch (error) {
		throw new Error(error);
	}
};

exports.delete = async (todoId) => {
	try {
		const result = await db()
			.collection(TODOS)
			.deleteOne({ _id: ObjectId(todoId) });
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

exports.update = async (todoId, newBody) => {
	const filter = { _id: ObjectId(todoId) };
	const options = { upsert: newBody.isCompleted };
	const {_id, ...newBodyDemo} = newBody;
	const update = { $set: { ...newBodyDemo } };
	try {
		const result = await db().collection('todos').updateOne(
			filter,
			update,
			options
		);
		return result;
	} catch (error) {
		throw new Error(error);
	}
}


exports.create = async (newBody) => {
	try {
		console.log('model ' + newBody.name)
		const result = await db()
			.collection(TODOS)
			.insertOne({ ownerId: newBody.ownerId, listId: newBody.listId, name: newBody.name, priority: newBody.priority ,  description: newBody.description, creationdate: newBody.creationdate, duedate: newBody.duedate, isCompleted: newBody.isCompleted })
		return result;
	} catch (error) {
		throw new Error(error);
	}
};


exports.listByOwnerId = async (ownerId) => {
	try{
		const list = db().collection(TODOS).find({ ownerId: ownerId}).toArray();
		return list;
	}
	catch (err) {
		throw new Error(err);
	}
}

exports.listByListId = async (listId) => {
	console.log(listId)
	try{
		const list = db().collection(TODOS).find({ listId:listId}).toArray();
		return list;
	}
	catch (err) {
		throw new Error(err);
	}
}