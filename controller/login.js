
var formidable = require("formidable");
var crypto = require('crypto');

var User = require("../models/User.js");

exports.doctrl = function(req,res){
		res.render("login",{
			"login":req.session.login,
			"email":req.session.email,
			"column":'login'
		});
};


exports.loginctrl = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var email = fields.email;
		var password = fields.password;
		password = crypto.createHash("SHA256").update(password+"wo").digest("hex");
		User.find({"email":email},function(err,result){
			if(result.length>0 ){
				if(password == result[0].password){
					req.session.login = true;
					req.session.email = email;
					res.json({"result":err?-1:1});
				}
			}else{
				res.json({"result":-2});
			}
		});
	});
};