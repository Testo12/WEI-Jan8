var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var AdminSchema = new Schema({
    userName: {type: String, required: true, max: 1000},
    password: {type: String, required: true, max: 1000}
});

AdminSchema.pre('save', function (next) {
    var user = this;
    
    bcrypt.hash(user.password, null, null, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });
  
  AdminSchema.methods.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
      if(err){
        return cb(err);
  
      }
      cb(null, isMatch);
    });
  };
module.exports = mongoose.model('Admin', AdminSchema, "admin");