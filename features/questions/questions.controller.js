var Questions = require('./questions.model');
var path = require('path');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

exports.questionsGetAll = function (req, res) {
  Questions.find({}, function(err, result) {
            err
                ?
                res.status(400).send({
                    error: 'Error finding Questions in database'
                }) :
                res.status(200).json(result)
        })
}

exports.questionsGetOne = function (req, res) {
  var id = req.params.id;

        Questions.findById(id, function(err, result) {
            err
                ?
                res.status(400).send({
                    error: 'Error finding Questions by id in database'
                }) :
                res.status(200).json(result)
        });
}
exports.updateQuestion = function(req,res) {
  var {question_id , title} = req.body
  	Questions.update(
  	{
  		"_id":question_id
  	},
  	{
  		$set : {
  			"title" : title
  		}
  	},
  	function(err,doc){
  		if(err){
  			console.log(err)
  		}else{
  			if(doc.nModified === 1){
  				Questions.find({
  					"_id" : question_id
  				},function(err,doc){
  					if(err){
  						console.log(err)
  					}else{
  						console.log(doc)
  						res.status(200).json({success :true, message:"Question Update successfully" , doc:doc[0]['title']})
  					}
  				})

  			}else{
  				res.status(400).json({success :false, message:"Question Update Failed"})
  			}
  		}
  	}
  	)
}

exports.deleteQuestion = function(req,res){

  var { question_id } = req.body
  	Questions.remove(
  	{
  		"_id":question_id
  	},
  	function(err,doc){
  		if(err){
  			console.log(err)
  		}else{
  			if(doc.result.n == 1){
  				Questions.find(
  					{
  					},
  					function(err,doc){
  						if(err){
  							console.log(err)
  						}else{
  							res.status(200).json({success :true, message:"Question Delete successfully", doc:doc})
  						}
  					}
  				)
  			}else{
  				res.status(200).json({success :false, message:"Question Delete failed"})
  			}

  		}

  	})

}

exports.questionsAdd = function (req, res) {
  let tags = req.body['tags']

        var newQuestion = new Questions({
            title: req.body['title'],
            description: req.body['description'],
            user: req.body['user'],
            tags: tags.map(tag => tag)
        });

        newQuestion.save(function(e) {
            e
                ?
                res.status(400).send({
                    error: ' Error saving question in mongoDB!'
                }) :
                res.status(200).send('Added successfully!');
        });
}
