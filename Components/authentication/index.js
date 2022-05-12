const express = require('express');
const authenticationController = require('./authenticationController');
const router = express.Router();

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);
router.post('/googlelogin', authenticationController.googlelogin);
router.post('/googleregister', authenticationController.googleregister);

router.get('/', authenticationController.getAllUsers);
router.get('/:email', authenticationController.getAUser);

module.exports = router;