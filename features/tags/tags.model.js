var mongoose = require('mongoose');

var tagsSchema = new mongoose.Schema({
    tag_name: {
        type: String,
        required: true
    },
    tag_description: {
        type: String,
        required: true
    },
    tag_subscribers: []

})

module.exports = mongoose.model('Tags', tagsSchema)
