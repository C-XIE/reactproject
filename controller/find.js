
var formidable = require("formidable");
var url = require('url');

var Find = require("../models/Find.js");


exports.find = (req, res) => {
    const query = url.parse(req.url, true).query;
    let defaultObj = {
        "page": 1,
        "pagesize": 20
    };
    let queryObj = {};
    if (query.page) {
        defaultObj.page = query.page;
    }
    if (query.pagesize) {
        defaultObj.pagesize = query.pagesize;
    }
    if (query.type) {
        queryObj.type = query.type;
    }
    if (query.group) {
        queryObj.group = query.group;
    }
    if (query.money) {
        queryObj.money = { "$gte": JSON.parse(query.money)[0], "$lte": JSON.parse(query.money)[1] };
    }
    if (query.rom) {
        queryObj.rom = { "$in": JSON.parse(query.rom) };
    }
    if (query.color) {
        queryObj.color = { "$in": JSON.parse(query.color) };
    }
    if (query.fom) {
        queryObj.fom = { "$in": JSON.parse(query.fom) };
    }
    Find.count(queryObj, (err, count) => {
        Find.find(queryObj).skip((defaultObj.page - 1) * defaultObj.pagesize).limit(defaultObj.pagesize).lean().exec((err, result) => {
            if (!err) {
                res.json({ count, result });
            }
        })
    })
}
let typearr = ["前端开发", "移动开发", "后台开发", "测试", "运维管理", "产品经理", "产品设计师", "UI设计", "网页设计", "交互设计"];
let grouparr = ["北京", "上海", "广州", "深圳"];
let romarr = ["大专", "本科", "硕士", "博士", "不限"];
let colorarr = ["应届生", "1年", "2年", "5年", "不限"];
let fomarr = ["未融资", "A轮", "B轮", "C轮", "上市"]
exports.add = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let email = "root@qq.com";
        //type group rom color fom  均后台 随机指定 没有让用户输入  。。
        let type = typearr[parseInt(Math.random() * typearr.length)];
        let group = grouparr[parseInt(Math.random() * grouparr.length)];
        let rom = grouparr[parseInt(Math.random() * romarr.length)];
        let color = grouparr[parseInt(Math.random() * colorarr.length)];
        let fom = grouparr[parseInt(Math.random() * fomarr.length)];

        const { comment, company, enddate, startdate, hr, money, name } = fields;
        Find.create({ email, type, group, rom, color, fom, comment, company, enddate: new Date(enddate), startdate: new Date(startdate), hr, money, name }, (err, data) => {
            res.json({ "result": data });
        });
    })
}
exports.getalljob = (req, res) => {
    // var form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    Find.count({ "group": "北京" }, (err, data1) => {
        Find.count({ "group": "上海" }, (err, data2) => {
            Find.count({ "group": "广州" }, (err, data3) => {
                Find.count({ "group": "深圳" }, (err, data4) => {
                    res.json({
                        "resultcity": {
                            "beijing": data1,
                            "shanghai": data2,
                            "guangzhou": data3,
                            "shenzhen": data4
                        }
                    });
                })
            })
        })
    });
}
exports.getallmoney = (req, res) => {
    Find.count({ "money": { "$gte": 2000, "$lte": 5000 } }, (err, data1) => {
        Find.count({ "money": { "$gte": 5000, "$lte": 6000 } }, (err, data2) => {
            Find.count({ "money": { "$gte": 6000, "$lte": 7000 } }, (err, data3) => {
                Find.count({ "money": { "$gte": 7000, "$lte": 8000 } }, (err, data4) => {
                    Find.count({ "money": { "$gte": 8000, "$lte": 10000 } }, (err, data5) => {
                        res.json({
                            "resultmoney": {
                                "a": data1,
                                "b": data2,
                                "c": data3,
                                "d": data4,
                                "e": data5
                            }
                        });
                    })
                })
            })
        })
    });
}

