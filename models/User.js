var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	"email":String,
	"password":String,
	"nickname":{
		"type":String,
		"default":"没有昵称"
	},
	"introduction":{
		"type":String,
		"default":"这个人很懒,什么都没有留下"
	},
	"avatar":{
		"type":String,
		"default":"images/default.jpg"
	},
	"date":Date
});

module.exports = mongoose.model('user',schema);