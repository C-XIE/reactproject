var formidable = require("formidable");
//内置加密算法模块
var crypto = require('crypto');
//引入session模块


var User = require("../models/User.js");

exports.doctrl = function(req,res){
		res.render("regist",{
			"login":req.session.login,
			"email":req.session.email,
			"column":'regist'
		});
};
//接收数据 并加密  验证然后保存




exports.savectrl = function(req,res){
		
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
      //接收数据   并加密 保存
      var email = fields.email;
      var password = fields.password;
      // 先验证数据的 正确性 
      // 验证邮箱 
      if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(email)){
      	//邮箱格式不对
      	res.json({"result":-2});
      	// console.log(1);
      	return;
      }
      //验证密码 强度 位数

      if(password.length < 6 || password.length > 16){
      	//密码长度不对
      	res.json({"result":-3});
      	return;
      }
      
      	var score = 0;
		if(/[0-9]/g.test(password)){
			score++;
		}
		if(/[a-z]/g.test(password)){
			score++;
		}
		if(/[A-Z]/g.test(password)){
			score++;
		}
		if(/[\!\@\#\$\%\^\&\*\(\)\_\+\{\}\[\]\;\'\,\.\/\\]/g.test(password)){
			score++;
		}
		if(score >=3){
			//密码加密

			password = crypto.createHash("SHA256").update(password+"wo").digest("hex");
			User.count({"email":email},function(err,count){
				if(count == 0){
					User.create({
						"email":email,
						"password":password,
						"date":new Date()
					},function(err){
						res.json({"result":err?-1:1});
					});
				}else{
					//邮箱重复
					// console.log(count);
					res.json({"result":-5});
					return;
				}
			});
		}else{
			//密码强度不对
			res.json({"result":-4});
			return;
		} 
  });
};
exports.checkctrl = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		var email = fields.email;
		User.count({"email":email},function(err,count){
			res.json({"count":count});
		});
	});
};