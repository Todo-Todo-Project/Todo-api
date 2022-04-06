const authenticationService = require('./authenticationService');
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