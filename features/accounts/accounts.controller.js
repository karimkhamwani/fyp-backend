const jwt = require('jsonwebtoken');
// const auth = require('../../server/auth');
var config = require('../../config/config');
const Accounts = require('./accounts.model');
var hash = require('./saltandhash');

exports.accountFindOne =  function (req, res) {
  var username = req.body['username']
        if (username) {
            Accounts.findOne({
                username: username
            }, function(e, o) {
                if (o) {
                    res.status(200).send({
                        user: o
                    });
                } else {
                    res.status(400).send({
                        error: ' Username not found in database'
                    })
                }
            });

        } else {
            return res.status(400).json({
                error: 'No username provided'
            });
        }
}

exports.accountAuthenticate = function (req, res) {
  var token = req.body['token']

        if (token) {
            jwt.verify(token, config.secretKey, function(err, user) {
                if (err) {
                    return res.status(400).json({
                        error: 'Failed to authenticate token'
                    });
                } else {
                    Accounts.findOne({
                        _id: user.id
                    }, function(e, o) {
                        o
                            ?
                            res.status(200).send({
                                user: o
                            }) :
                            res.status(400).send({
                                error: ' Username not found in database'
                            })
                    })
                }
            });

        } else {
            return res.status(400).json({
                error: 'No token provided'
            });
        }
}

exports.accountLogin = function (req, res) {
  var {
          username,
          password
      } = req.body['credentials']
      username = username.toLowerCase();

      Accounts.findOne({
          username: username
      }, function(e, o) {
          if (o == null) {
              res.status(400).send({
                  error: 'Username undefined'
              });
          } else {
              hash.validatePassword(password, o.password, function(e, r) {
                  if (r) {
                      var payload = {
                          id: o._id,
                          iss: 'doyouthink.fm',
                          iat: Date.now()
                      }

                      var token = jwt.sign(payload, config.secretKey, {
                          expiresIn: 10080 * 60
                      });
                      res.status(200).json({
                          token
                      });

                  } else {
                      res.status(400).send({
                          error: 'Incorrect Password'
                      });
                  }
              });
          }
      });
}

// {
// 	"user" : {
// 		"user": "demo",
//         "name": "demo",
//         "email": "demo@demo.com",
//         "gender": {
//         	"value": "demo"
//         },
//         "username": "demo",
//         "password": "demo",
//         "age": 10
// 	}
// }

exports.accountRegister = function (req, res) {
  var {
            user,
            name,
            email,
            gender,
            username,
            password,
            age
        } = req.body['user']
        username = username.toLowerCase()
        Accounts.findOne({
            username: username
        }, function(e, o) {
            if (o) {
                res.status(400).send({
                    error: 'Username Taken'
                });
            } else {
                Accounts.findOne({
                    email: email
                }, function(e, o) {
                    if (o) {
                        res.status(400).send({
                            error: 'Email taken'
                        });

                    } else {
                        hash.saltAndHash(password, function(hash_password) {
                            var account = new Accounts({
                                name: name,
                                username: username,
                                password: hash_password,
                                age: age,
                                emails: email,
                                gender: gender.value
                            });
                            console.log(account);
                            account.save(function(e) {
                                e
                                    ?
                                    res.status(400).send({
                                        error: ' Error saving data in mongodb'
                                    }) :
                                    res.status(200).send(' Added successfully!');
                            });
                        });
                    }
                });
            }
        });
}