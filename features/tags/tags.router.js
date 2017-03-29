var express = require('express');
var router = express.Router();
var tagsController = require('./tags.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
// var verify = require('../../server/verify');
var PythonShell = require('python-shell');
var path = require('path');

//Add new
router.post('/addnew', tagsController.tagsAdd);

//Get all
router.get('/getall', tagsController.tagsGetAll);

//subscribed
router.get('/subscribe', tagsController.tagsSubscribe);

module.exports = router;
