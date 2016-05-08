var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadSchema = new Schema({
    name: String,
    email: String,
    date: String
});

var Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;