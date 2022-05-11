const { json } = require('express');
const e = require('express');
const { use } = require('passport');
const { join } = require('path');
const authenticationService = require('./authenticationService');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

exports.register = function (req, res) {
  try {
    const user = authenticationService.register(req.body.email, req.body.password);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async function (req, res) {
  try {
    const loginInfo = await authenticationService.login(req.body.email, req.body.password);
    res.status(200).send({
      user: { _id: loginInfo._id, email: loginInfo.email },
      accessToken: authenticationService.createJwt(loginInfo),
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.googlelogin = (req, res) => {
  const {tokenId} = req.body;
  client.verifyIdToken({idToken: tokenId, audience: process.env.REACT_APP_GOOGLE_CLIENT_ID}).then(response => {
    const {email_verified, name, email} = response.payload;

    console.log(response.payload);
  })
};

exports.getAllUsers =  async(req, res) =>{
  const user = await authenticationService.getAllUsers(req.body.email);
  if(user.length !== 0){
    res.status(201).json(user);
  }else{
    res.status(404).json({message: 'Err!'});
  }
}

exports.getAUser =  async(req, res) =>{
  const user = await authenticationService.getAUser(req.body.email);
  if(!user)
    res.status(201).json(user);
  else
    res.status(404).json({message: 'Not found'})
}