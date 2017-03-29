var Suggestion = require('./suggestions.model');
var path = require('path');

exports.suggestionsAdd = function (req, res) {
  if (req.body['id']) {

            Suggestion.findByIdAndUpdate(req.body['id'], {
                completed: req.body['completed']
            }, function(err, result) {
                if (err) {
                    res.status(400).send({
                        error: 'Cannot update report in database'
                    })
                } else {
                    Suggestion.find({}, function(e, o) {
                        e
                            ?
                            res.status(400).send({
                                error: 'Cannot find bugs in database'
                            }) :
                            res.status(200).json(o);
                    })
                }
            })
        } else {
            next()
        }
    }, function(req, res, next) {

        var newSuggestion = new Suggestion({
            user: req.body['user'],
            suggestion: req.body['bug']
        });

        newSuggestion.save(function(e, o) {
            e
                ?
                res.status(400).send({
                    error: 'Cannot insert bug in database'
                }) :
                res.status(200).json(o);
        });
    });
}

exports.suggestionsGetAll = function (req, res) {
  Suggestion.find({}, function(e, o) {
            e
                ?
                res.status(400).send({
                    error: 'Cannot find bugs in database'
                }) :
                res.status(200).json(o);
        })
}