const listsModel = require('./listModel');
const { db } = require('../../models/db');
const { TODOS } = require('../../models/collections');
const { ObjectId } = require('mongodb');

exports.lists = async (ownerId) => {
    const lists = await listsModel.lists(ownerId);
    if (lists) return lists
    return null;
}

exports.delete = async (listId) => {
    const result = await listsModel.delete(listId);
    if (result.deletedCount) return result;
    return null; 
}


exports.update = async (listId, newBody) => {
    const result = await listsModel.update(listId, newBody);
    if (result.modifiedCount) return result;
    return null;
}

exports.create = async (newBody) => {
    const result = await listsModel.create(newBody);
    if(result.insertedId){
        return result;
    }
    return null;
}