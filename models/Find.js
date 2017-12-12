var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    "email": String,
    "name": String,
    "company": String,
    "hr": String,
    "money": Number,
    "comment": String,
    "startdate": Date,
    "enddate": Date,
    "type":String,
    "group":String,
    "fom":String,
    "color":String,
    "rom":String
});

module.exports = mongoose.model('find', schema);