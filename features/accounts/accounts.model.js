var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emails: [
        {
            type: String,
            required: true,
            unique: true
        }
    ],
    tag_subscriptions: [
      {
        type: Object,
        required: true
      }
    ],
    age: {
      type: Number,
      required: true
    },
    admin: {
      type: Boolean,
      required: true,
      default: false
    },
    gender: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Accounts', accountSchema);