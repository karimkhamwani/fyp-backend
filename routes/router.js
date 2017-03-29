const express = require('express');
const accounts = require('../features/accounts/accounts.router');
const questions = require('../features/questions/questions.router');
const comments = require('../features/comments/comments.router');
// const suggestions = require('../features/suggestions/suggestions.router');
const tags = require('../features/tags/tags.router');

module.exports = function (app) {
  const router = express.Router();

  router.use('/accounts', accounts);
  router.use('/questions', questions);
  router.use('/comments', comments);
  // router.use('/suggestions', suggestions);
  router.use('/tags', tags);

  app.use('/api', router);
};
