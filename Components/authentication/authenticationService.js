const bcrypt = require('bcryptjs');
const { db } = require('../../models/db');
const { USERS } = require('../../models/collections');
const jwt = require('jsonwebtoken');
const {ObjectId} = require('mongodb');

exports.register = async (email, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt); 
  return db().collection(USERS).insertOne({
    email,
    password: hash,
  });
};

exports.login = async (email, password) => {
  const user = await db().collection(USERS).findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }
  return user;
};

exports.createJwt = (user) => {
  return jwt.sign({
    userId: user._id,
    email: user.email,
  }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

exports.getAllUsers = async () =>{
  try{
    const user = await db().collection(USERS).find().toArray()
    return user;
  } catch(err){
    throw new Error(err);
  }
}

exports.getAUser = async (email) =>{
  try{
    const users = await db().collection(USERS).find().toArray();
    users.map(user => {
      // console.log(user.email + " ||" + user.password);
      if(user.email === email)
        return user;
    })
  }catch(err){
    throw new Error(err)
  }
}