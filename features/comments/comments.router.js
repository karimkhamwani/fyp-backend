var express = require('express');
var router = express.Router();
var commentsController = require('./comments.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
// var verify = require('../../server/verify');


//Add new
router.post('/addnew', commentsController.commentsAdd);
router.post('/update', commentsController.commentUpdateOne);
router.post('/delete',commentsController.deleteComment);

module.exports = router;
