const listsService = require('./listService')

exports.list = async (req, res) => {
    const ownerId = req.params.ownerId;
    console.log(ownerId)
    const lists = await listsService.lists(ownerId);
    if (lists.length !== 0) {
        res.status(202).json(lists);
    }else{
        res.status(404).json({message: 'List not found'});
    }
}

exports.delete = async (req, res) => {
    const list = await listsService.delete(req.body._id);
    console.log(req.body)
    if(list){
        res.status(202).json({message: 'List deleted'});
    }else{
        res.status(404).json({message: 'List not found'});
    }
}

exports.update = async (req,res) => {
    const ownerId = req.params._id;
    const updateOne = await listsService.update(req.params.id, req.body);
    if(updateOne) {
        res.status(202).json({ message: 'Successfully update'});
    }else{
        res.status(404).json({message: 'List not found'});
    }
}

exports.create = async (req, res) => {
    const ownerId = req.body.ownerId
    const copyBody = {...req.body, ownerId};
    const insertOne = await listsService.create(copyBody);
    if(insertOne) {
        res.status(202).json({ message: 'Successfully create new list'});
    }else{
        res.status(404).json({message: 'List not found'});
    }
}

exports.getListByEmail = async (req, res) => {
    const listEmail  = await listsService.getListByEmail(req.params.id);
    if(listEmail)
        res.status(202).json(listEmail);
    else
        res.status(404).json({message: 'List not found'});
}