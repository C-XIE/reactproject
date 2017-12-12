var express = require('express');
const webpack = require("webpack");
const fs = require("fs");

const webpackconfig = require('./webpack.config.js');
const Mock = require('mockjs')
const Random = Mock.Random;

var app = express();

app.use(express.static("Www"));

var mongoose = require('mongoose');

//连接数据库
mongoose.connect("mongodb://localhost/message");
mongoose.connect("mongodb://localhost/find");

var Find = require("./models/Find");
var Message = require("./models/Message");
let arr = [];
let arr2 = [];
let str = "sjdkkfhskdf";

var typearr = ["前端开发", "移动开发", "后台开发", "测试", "运维管理", "产品经理", "产品设计师", "UI设计", "网页设计", "交互设计"];
var grouparr = ["北京", "上海", "广州", "深圳"];
var romarr = ["大专", "本科", "硕士", "博士", "不限"];
var colorarr = ["应届生", "1年", "2年", "5年", "不限"];
var fomarr = ["未融资", "A轮", "B轮", "C轮", "上市"]
for (let i = 1; i <= 500; i++) {
    let arr1 = [];
    for (let j = 1; i <= parseInt(Math.random() * 20); j++) {
        var a = '';
        for (let m = 0; m < str.length; m++) {
            a += str[parseInt(Math.random() * str.length)]
        }
        arr1.push({
            "email": a + "qq.com",
            "comment": Random.cparagraph()
        })
    }
    arr2.push({
        // "id": i,
        // "key":i,
        "email": a + "qq.com",
        "title": Random.cparagraph(1),
        "content": Random.cparagraph(),
        "feedback": arr1,
        "zan":0,
        "time": new Date(Random.datetime()),
        "saveit": false
    })
        arr.push({
            "email": a + "qq.com",
            "name": Random.ctitle(3, 5),
            "company": Random.csentence(10),
            "hr": Random.cname(),
            "money": parseInt(Math.random()*8000)+2000,
            "comment": Random.csentence(25),
            "startdate": Random.datetime(),
            "enddate": Random.datetime(),
            "type":typearr[parseInt(Math.random() * typearr.length)],
            "group":grouparr[parseInt(Math.random() * grouparr.length)],
            "rom": romarr[parseInt(Math.random() * romarr.length)],
            "color":colorarr[parseInt(Math.random() * colorarr.length)],
            "fom":fomarr[parseInt(Math.random() * fomarr.length)]
        })
}
Find.remove({}, (err, data) => {
    console.log("删除" + data.result.n);
    Find.insertMany(arr, function (err, docs) {
        console.log("添加" + docs.length);
    });
})
Message.remove({}, (err, data) => {
    console.log("删除" + data.result.n);
    Message.insertMany(arr2, function (err, docs) {
        console.log("添加" + docs.length);
    });
})



