var express = require('express');
var router = express.Router();
var accountsController = require('./accounts.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
// var verify = require('../../server/verify');

//Add user
router.post('/603', accountsController.accountFindOne);

//Login
router.post('/auth', accountsController.accountAuthenticate);

//Add user
router.post('/signin', accountsController.accountLogin);

//Login
router.post('/register', accountsController.accountRegister);

module.exports = router;