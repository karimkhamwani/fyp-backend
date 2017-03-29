var db = require('mongoose');

var questionsSchema = new db.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Object,
        required: true
    },
    comments: [
        {
            comment: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            user: {
                type: Object,
                required: true
            }
        }
    ],
    tags: {
        type: Object,
        required: true
    }

});

module.exports = db.model('Questions', questionsSchema);
