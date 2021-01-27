var config = require('../config/config');
var mongoose = require('mongoose');
var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;

exports.connect = function (){
  mongoose.connect(config.mongoUrl);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connectsion errror:'));
  db.once('open', function () {
    // we're connected!
    log("MongoDB connected on "+ config.mongoUrl);
    log("##########################################s#################################");
  });
};

