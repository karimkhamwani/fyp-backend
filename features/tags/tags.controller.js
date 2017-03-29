var Tags = require('./tags.model');
var Account = require('../accounts/accounts.model');
var path = require('path');

exports.tagsSubscribe = function(req, res) {
  var tag_id = req.body['tag_id']
        var user_id = req.body['user_id']

        Account.findById(user_id, function(err, user) {
            err ? res.status(400).json({
                    error: 'shit: cannot find user by id'
                }) :
                Tags.findById(tag_id, function(err, tag) {
                    err ? res.status(400).json({
                            error: 'shit: cannot find tag by id'
                        }) :
                        Tags.findByIdAndUpdate(tag_id, {
                            $push: {
                                "tag_subscribers": {
                                    user
                                }
                            }
                        }, function(err, result) {
                            err ? res.status(400).json({
                                    error: 'shit : we found user and tag but cannot push the first push'
                                }) :
                                Account.findByIdAndUpdate(user_id, {
                                    $push: {
                                        "subscriptions": {
                                            tag: tag
                                        }
                                    }
                                }, function(err, result) {
                                    err ? res.status(400).json({
                                            error: 'shit :  we pushed user in tags but cannot push the second push :O... wtf right'
                                        }) :
                                        res.status(200).json({
                                            message: 'Sucess ! You subscribed to the tag successfully'
                                        })
                                })
                        })
                })
        })
}

exports.tagsAdd = function(req, res) {
  var tag_data = req.body['tag_data']
        var {
            tag_name,
            tag_description
        } = tag_data

        Tags.findOne({
            tag_name
        }, function(e, o) {
            if (o) {
                res.status(400).send({
                    error: 'Tag already exist in MongoDB'
                })
            } else {
                var newTag = new Tags({
                    tag_name: tag_name,
                    tag_description: tag_description
                })

                newTag.save(function(err) {
                    err
                        ?
                        res.status(400).send({
                            error: ' Error saving TAG in mongoDB!'
                        }) :
                        res.status(200).send('New TAG created');
                })
            }
        })
}

exports.tagsGetAll = function(req, res) {
  Tags.find({}, function(error, object) {
            var json = []

            object.map(tag => {
                json.push({
                    tag: tag,
                    label: tag.tag_name
                })
            })

            error
                ?
                res.status(400).send({
                    error: 'Error finding Tags in database'
                }) :
                res.status(200).json(json);
        })
}