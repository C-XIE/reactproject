
var formidable = require("formidable");
var url = require("url");
// var url = require("url");


var Message = require("../models/Message.js");

//自定义初始的 pagesize
const defaultObj = {
    pagesize:10
}

exports.getmessage = function(req,res){
    const currentpage = req.params.currentpage
    Message.count({},(err,count)=>{
        Message.find({}).sort({"_id":-1}).skip((currentpage-1)*defaultObj.pagesize).limit(defaultObj.pagesize).exec((err, result) => {
            res.json({ count, result })
        })
    })
};
exports.addmessage = (req,res)=>{
    console.log(req.session);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let createobj = {
            "email":"root@qq.com",
            "title":fields.message.title,
            "content":fields.message.content,
            "zan":0,
            "saveit":false,
            "feedback":[],
            "time":new Date()
        }
        Message.create(createobj,(err,data)=>{
            res.json({"result":data});
        })
    })
}
exports.save = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const _id = fields._id;
        const bool = fields.bool;
        Message.update({_id},{"$set":{"saveit":bool}},(err,data)=>{
           if(!err){
               Message.find({_id},(err,result)=>{
                   res.json({result})
               })
           }
        })
    })
}
exports.zan = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const _id = fields._id;
        const num = fields.num;
        Message.update({ _id }, { "$set": { "zan": num}},(err,data)=>{
           if(!err){
               Message.find({_id},(err,result)=>{
                   res.json({result});
               })
           }
        })
    })
}
exports.comment = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const _id = fields._id;
        const comment = fields.comment;
        let email = "root@qq.com";
        Message.update({ _id },{"$push":{"feedback":{email,comment}}}, (err, data) => {
            if(data.ok == 1){
                Message.find({_id},(err,result)=>{
                    res.json({result})
                })
            }
        })
    })
}