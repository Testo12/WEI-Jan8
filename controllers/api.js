var Users = require('../models/user');
var Admin = require('../models/admin');
var passport = require('passport');
var jwt = require('jwt-simple');
var passed = false;
var token;

exports.list = function(req,res){
    Users.find(function(err, users){
        if (err) return next(err);

       res.send(users);
    });
};

exports.cue = function(req,res){
    Users.find(function(err, users){
        if (err) return next(err);
        var array = [];
        for (var i = 0; i < users.length; i++){
           if(users[i].team == "C.U.E"){
                array.push([i, users [i]]);
            } 
        }
        res.send(array);
        
        
    });
};

exports.wei = function(req,res){
    Users.find(function(err, users){
        if (err) return next(err);
        var array = [];
        for (var i = 0; i < users.length; i++){
           if(users[i].team == "W.E.I"){
                array.push([i, users [i]]);
            } 
        }
        res.send(array);
        
        
    });
};

exports.login = function(req,res){
    User.findOne({
        userName: req.body.userName.toLowerCase()
    }, function(err, user){
        if (err) throw err;

        if(!user){
            return res.send('error');
            
            
        } else{
            user.comparePassword(req.body.password.toLowerCase(), function(err, isMatch){
                if (isMatch && !err){
                    var createdToken = jwt.encode(user, config.secret);
                    token = 'Bearer '+createdToken;
                    //res.json({success: true, token: 'Bearer ' + token});
                    //res.cookie('auth', 'Bearer ' + token);
                    res.send('Bearer '+createdToken);
                    
                    
                }else{
                    return res.send('error');
                }
            })
        }
    });
};

exports.home = passport.authenticate('jwt', {session: false}), function (req, res){
    var createdToken = getToken(req.headers);
    if(createdToken){
        var decoded = jwt.decode(createdToken, config.secret);
        firstName = decoded.firstName;
        lastName = decoded.lastName;
        User.findOne({
            email: decoded.email
        }, function(err, user){
            if(err) throw err;

            if (!user){
                return res.status(403).send({success: false, msg: 'User not found'});
            }else {
                passed = true;
                return res.send('../../api/map/home');

            }
        })
    }else {
        return res.status(403).send({success: false, msg: 'No token provided'});
    }

};