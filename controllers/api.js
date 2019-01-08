var Users = require('../models/user');
//var admin = require('../models/admin');

exports.list = function(req,res){
    Users.find(function(err, users){
        if (err) return next(err);

       res.send(users);
    });
};