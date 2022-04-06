const bcrypt = require('bcryptjs');
const { db } = require('../../models/db');
const { USERS } = require('../../models/collections');
const jwt = require('jsonwebtoken');

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