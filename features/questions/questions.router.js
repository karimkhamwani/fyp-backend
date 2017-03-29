var express = require('express');
var router = express.Router();
var questionsController = require('./questions.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
// var verify = require('../../server/verify');
var PythonShell = require('python-shell');
var path = require('path');

//Add new
router.post('/addnew', questionsController.questionsAdd);

//Get all
router.get('/getall', questionsController.questionsGetAll);

//Get one
router.post('/getone/:id', questionsController.questionsGetOne);

//update one
router.post('/update',questionsController.updateQuestion);

//delete one
router.post('/delete',  questionsController.updateQuestion);


module.exports = router;
