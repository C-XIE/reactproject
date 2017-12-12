
var formidable = require("formidable");
var path = require("path");
var url = require("url");
var gm = require('gm');
var fs = require('fs');
var User = require("../models/User.js");
exports.showctrl = function(req,res){

	// var email = req.session.email;
	//调试临时代码  让 一致登录  开始
	// req.session.login = true;
	// req.session.email = "735244373@qq.com";
	//调试代码结束
	if(!req.session.login){
		res.redirect("/login")
	}else{
		res.render("info",{
			"login":req.session.login,
			"email":req.session.email,
			"column":"info",
				// "nickname":result[0].nickname,
				// "introduction":result[0].introduction,
				// "avatar":result[0].avatar
			});
	}
};

// 当访问info页面时  直接 checkout 拉取默认数据   不使用模板
exports.defaultctrl = function(req,res){
	User.find({"email":req.session.email},function(err,result){
		res.json({
			"nickname":result[0].nickname,
			"introduction":result[0].introduction,
			"avatar":result[0].avatar
		});
	});
};

exports.savectrl = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		User.update({"email":req.session.email},{"$set":{
			"nickname":fields.nickname,
			"introduction":fields.introduction

		}},function(err){
			res.json({"result":err?-1:1});
		});
	});
};

exports.formctrl = function(req,res){
	res.render("form",{});

};
exports.savecut =  function(req,res){
	//保存用户上传的文件
	var form = new formidable.IncomingForm();
	//上传文件 注意 form变暗必须设置enctype  以及inut 必须加name属性
	form.uploadDir = path.resolve(__dirname , "../uploads");
	 //保留拓展名
	 form.keepExtensions = true;
	 form.parse(req, function(err, fields, files){
	 	var fileurl = url.parse(files.upload.path).pathname.match(/\/(upload_.+)$/)[1];
	//得到文件名
	    req.session.url = fileurl;
	    var getPath = path.resolve(__dirname,"../uploads/"+fileurl);
	    // 先得到图片的宽高
	 	gm(getPath).size(function(err,size){
	 		if(size.width/size.height>=460/360 && size.width>=460){
	 			//约束高
	 			res.render("cut",{
	 				"url":fileurl,
	 				"width":460,
	 				"height":460*size.height/size.width
	 			});
	 		}else if(size.width/size.height<460/360 && size.height>=360){
	 			res.render("cut",{
	 				"url":fileurl,
	 				"width":360*size.width/size.height,
	 				"height":360
	 			});
	 		}else{
	 			res.render("cut",{
	 				"url":fileurl,
	 				"width":size.width,
	 				"height":size.height
	 			});
	 		}
	 	});
	    
    });
};
exports.getpic = function(req,res){
	var form = new formidable.IncomingForm();
	 form.parse(req, function(err, fields, files){
	 	var imageW = fields.source_w;
	 	var imageH = fields.source_h;
	 	var getPath = path.resolve(__dirname,"../uploads/"+req.session.url);
	 	var writePath = path.resolve(__dirname,"../www/images/"+req.session.url);
	 	gm(getPath).size(function(err,size){
	 		var ratio;
	 		if(imageW == 460){
	 			ratio = size.width/460;
	 		}else if(imageH ==360){
	 			ratio = size.height/360;
	 		}else{
	 			ratio = size.height/imageH;
	 		}
	 		var x = parseInt(fields.x*ratio);
	 		var y = parseInt(fields.y*ratio);
	 		var wh = parseInt(fields.wh*ratio);
	 		gm(getPath).crop(wh,wh,x,y).write(writePath, function (err) {
	 			res.json({"result":err?-1:1});
	 		})
	 	})
	 });
};
exports.dopic = function(req,res){
	User.update({"email":req.session.email},{"$set":{"avatar":"images/"+req.session.url}},function(err){
		if(!err){
			res.json({"url":req.session.url});
		}
	});
	
};
