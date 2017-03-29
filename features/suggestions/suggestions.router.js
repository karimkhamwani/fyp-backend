var express = require('express');
var router = express.Router();
var suggestionsController = require('./suggestions.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
// var verify = require('../../server/verify');
var PythonShell = require('python-shell');
var path = require('path');

//Add new
router.post('/addnew', suggestionsController.suggestionsAdd);

//Get all
router.get('/getall', suggestionsController.suggestionsGetAll);

module.exports = router;
