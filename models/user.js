var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
    name: [String],
    info: {type: String, required: true, max: 1000},
    team: {type: String, required: true, max: 1000}
});

module.exports = mongoose.model('Users', ListSchema, "list");