var db = require('mongoose');

var suggestionsSchema = new db.Schema({

    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Object,
        required: true
    },
    suggestion: {
        type: String,
        required: true
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    }
});

module.exports = db.model('Suggestions', suggestionsSchema);
