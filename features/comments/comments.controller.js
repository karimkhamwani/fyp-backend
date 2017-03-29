var Questions = require('../questions/questions.model');
var PythonShell = require('python-shell');
var path = require('path');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

exports.commentUpdateOne = function (req, res) {
  var {comment_id, comment} = req.body
	console.log(req.body)
  Questions.update(
  {
  	"comments._id":ObjectId(comment_id)
  },
  {
  	$set :{
  		"comments.$.comment" :comment
  	}
  },
  function(err,doc){
  	if(err) {
  		res.status(400).json({success :false, message:"Something went wrong"})
  	}else{
  		console.log(doc)
  		if(doc.nModified === 1){
				Questions.find(
					{
						"comments._id":ObjectId(comment_id)
					},
					function(err,doc){
						res.status(200).json({success :true, message:"Comment Update successfully",doc:doc[0]['comments']})
					}
				)

  		}else{
  			res.status(400).json({success :false, message:"Comment Update Failed"})
  		}
  	}
  })
}

exports.deleteComment = function(req,res) {
  var { comment_id , question_id } = req.body
	Questions.update(
	{
		"_id":question_id,
		"comments._id":ObjectId(comment_id)
	},
	{
		$pull : {
			"comments" : {
				"_id" : ObjectId(comment_id)
			}
		}
	},
	function(err,doc){
		if(err){
			res.status(400).json({success :false, message:"Something went wrong"})
		}else{
			console.log(doc)
			if(doc.nModified === 1){
				Questions.find({
					"_id" : question_id
				},
				function(err,doc){
					if(err){
						console.log(err)
					}else{
							res.status(200).json({success :true, message:"Comment Delete successfully", doc:doc[0]['comments']})
              var options = {
                  scriptPath: path.join(__dirname, '../python'),
                  args: [process.env.MONGO_URI]
              }



              PythonShell.run('mong.py', options, function(err) {
                  if (err)
                      console.log(err);
                  console.log('emoji updated');
                  PythonShell.run('chart_data.py', options, function(err) {
                      if (err)
                          console.log(err);
                      console.log('chart_data updated');
                      PythonShell.run('genderbased.py', options, function(err) {
                          if (err)
                              console.log(err);
                          console.log('genderbased updated');
                      });
                  });
              });

					}
				})

			}else{
				res.status(400).json({success :false, message:"Comment Delete Failed"})
			}
		}
	}
	)
}

exports.commentsAdd = function(req, res) {
  var id = req.body['id']
        var comment = req.body['comment']
        var user = req.body['user']

        Questions.findByIdAndUpdate(id, {
            $push: {
                "comments": {
                    comment: comment,
                    user: user
                }
            }
        }, function(err, result) {
            if (err) {
                res.status(400).send({
                    error: 'Cannot insert comment in database'
                })
            } else {

                var options = {
                    scriptPath: path.join(__dirname, '../python'),
                    args: [process.env.MONGO_URI]
                }



                PythonShell.run('mong.py', options, function(err) {
                    if (err)
                        console.log(err);
                    console.log('emoji updated');
                    PythonShell.run('chart_data.py', options, function(err) {
                        if (err)
                            console.log(err);
                        console.log('chart_data updated');
                        PythonShell.run('genderbased.py', options, function(err) {
                            if (err)
                                console.log(err);
                            console.log('genderbased updated');
                        });
                    });
                });



                Questions.findById(id, function(err, o) {
                    err
                        ?
                        res.status(400).send({
                            error: 'Error finding comment in database'
                        }) :
                        res.status(200).json({
                            result: o,
                            message: 'Comment Added',
                            success: true
                        })
                })
            }
        })
}
