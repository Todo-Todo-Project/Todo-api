const { ObjectId } = require("mongodb");
const { LISTS } = require("../../models/collections");
const { db } = require("../../models/db");

exports.lists = async (ownerId) => {
	console.log(ownerId)
  try {
    const lists = await db().collection(LISTS).find({ownerId: ownerId}).toArray();
    return lists;
  } catch (err) {
    throw new Error(err);
  }
};

exports.delete = async (listId) => {
	console.log(listId)
  try {
    const result = await db()
      .collection(LISTS)
      .deleteOne({"_id": ObjectId(listId)});
    return result;
  } catch (err) {
    throw new Error(err);
  }
};


exports.update = async (ownerId, newBody) => {
	const filter = { _id: ObjectId(ownerId) };
	const options = { upsert: newBody.isCompleted };
	const {_id, ...newBodyDemo} = newBody;
	const update = { $set: { ...newBodyDemo } };
	try {
		const result = await db().collection(LISTS).updateOne(
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
		// console.log('model' + newBody.name)
		const result = await db()
			.collection(LISTS)
			.insertOne({ ownerId: newBody.ownerId, listName:newBody.listName, isCompleted: newBody.isCompleted, listEmail: newBody.listEmail ,todos: newBody.todos })
		return result;
	} catch (error) {
		throw new Error(error);
	}
};
