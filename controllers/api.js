var Users = require('../models/user');
var Admin = require('../models/admin');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var passed = false;
var token;


exports.member = function(req, res){
    Users.findOneAndUpdate({team: req.body.team}, {$push:{name: req.body.name}}, {new: true}, (err, doc) =>{
        if (err){
            return next(err);
        }
        res.send('Nice!');
    }); 
}


exports.skill = function(req, res){
    Users.findOneAndUpdate({team: req.body.team}, {$push:{name: req.body.skill}}, {new: true}, (err, doc) =>{
        if (err){
            return next(err);
        }
        res.send('Nice!');
    }); 
}


exports.register = function(req,res){
    var register = new Admin({
        userName: req.body.userName,
        password: req.body.password
    });

    
    register.save(function(error){
        //obs hantera error
        if (error){
            return next(error);
        }
        res.send('user created');
    });
};

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
    Admin.findOne({
        userName: req.body.userName.toLowerCase()
    }, function(err, user){
        if (err) throw err;

        if(!user){
            return res.send('error no users found');
            
            
        } else{
            console.log(user);
            user.comparePassword(req.body.password.toLowerCase(), function(err, isMatch){
                if (isMatch && !err){
                    var createdToken = jwt.encode(user, config.secret);
                    token = 'Bearer '+createdToken;
                    //res.json({success: true, token: 'Bearer ' + createdToken});
                    //res.cookie('auth', 'Bearer ' + token);
                    res.send('Bearer '+createdToken);
                    
                    
                }else{
                    return res.send('error, wrong password');
                }
            })
        }
    });
};

exports.home = function (req, res){
    passport.authenticate('jwt', {session: false});
    var createdToken = getToken(req.headers);
    if(createdToken){
        var decoded = jwt.decode(createdToken, config.secret);
        Admin.findOne({
            userName: decoded.userName
        }, function(err, user){
            if(err) throw err;

            if (!user){
                return res.status(403).send({success: false, msg: 'User not found'});
            }else {
                passed = true;
                return res.send('../../api/homepage');

            }
        })
    }else {
        return res.status(403).send({success: false, msg: 'No token provided'});
    }

};

exports.homepage = function(req,res){
    if(passed == true){
        res.render('home');
    }
    else{
        res.redirect('/');
    }
};

getToken = function(headers){
    if(headers && headers.authorization){
        var parted = headers.authorization.split(' ');
        if (parted.length === 2){
            return parted[1];
        } else {
            return null;
        }
    }else {
        return null;
    }
}

require('../config/passport')(passport);