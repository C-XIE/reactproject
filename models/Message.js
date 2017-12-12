var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    "id": Number,
    "email": String,
    "title": String,
    "content": String,
    "zan": Number,
    "saveit": Boolean,
    "feedback": [{
        "email": String,
        "comment": String
    }],
    "time": Date
});

module.exports = mongoose.model('message', schema);
