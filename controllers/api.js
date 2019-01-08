var Users = require('../models/user');
//var admin = require('../models/admin');

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