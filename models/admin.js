var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    name: [String],
    info: {type: String, required: true, max: 1000},
    team: {type: String, required: true, max: 1000}
});

module.exports = mongoose.model('Admin', AdminSchema, "admin");