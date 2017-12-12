const express = require('express');
const webpack = require("webpack");
const fs = require("fs");
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session')

const webpackconfig = require('./webpack.config.js');

const Find = require("./models/Find");
const message = require('./controller/message.js');
const find = require('./controller/find.js');
const regist = require('./controller/regist.js');
const login = require('./controller/login.js');
const index = require('./controller/index.js');
const info = require('./controller/info.js');

//连接数据库
mongoose.connect("mongodb://localhost/message");
mongoose.connect("mongodb://localhost/find");
mongoose.connect("mongodb://localhost/qasystem");

const app = express();
//模板引擎
app.set('view engine', 'ejs');



app.use("/uploads", express.static('uploads'));

//设置session
app.set('trust proxy', 1);// trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400 }
}))
// 访问首页在静态化 www文件夹 之前，不然就直接 定向到 www下的index.html
//必须在设置 session 之后 否则 报undefined

//获取首页
app.get("/", index.doctrl);
//静态化
app.use(express.static('www'));



//中间件  获取注册页面 呈递模板
app.get("/regist", regist.doctrl);
//点击提交按钮  保存数据
app.post("/regist", regist.savectrl);
//验证邮箱是否已经存在
app.checkout("/regist", regist.checkctrl);

// 显示登录界面
app.get("/login", login.doctrl);

// 点击登录按钮后 
app.post("/login", login.loginctrl);
//更改资料页面
app.get("/info", info.showctrl);

//checkout 直接  checkout 请求页面默认数据
app.checkout("/info", info.defaultctrl);

//用戶修改 个人资料
app.post("/info", info.savectrl);

//提交图片文件form
app.get("/form", info.formctrl);
app.post("/form", info.savecut);
//的到图片裁剪的参数
app.post("/pic", info.getpic);
//实时得到裁剪的小图 更改info中的小图
app.get("/pic", info.dopic);

app.get("/message/:currentpage", message.getmessage);
app.post("/message/add", message.addmessage);
app.patch("/message/save", message.save);
app.patch("/message/zan", message.zan);
app.patch("/message/comment", message.comment);
app.post("/find/add", find.add);
app.get("/api", find.find);
app.get("/info/job", find.getalljob);
app.get("/info/money", find.getallmoney);



app.listen(3000);
//运行webpack

webpack(webpackconfig , (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('webpack报错')
    }
    console.log('webpack运行成功')
});
