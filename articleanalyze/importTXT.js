/**
 * try to import admin.txt and bot.txt
 */
var fs = require("fs");
var adminPath = "./Admin.txt";
var botPath = "./Bot.txt";
//异步读取不会阻塞下面代码的执行, 同步读取会阻塞下面代码的执行
var adminNames = fs.readFileSync(adminPath).toString().split(/\r?\n/ig);
var botNames = fs.readFileSync(botPath).toString().split(/\r?\n/ig);
//console.log(adminNames);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikipedia', function () {
    console.log('mongodb connected')
});
//新建adminSchema Schema
var adminSchema = new mongoose.Schema({
    name: String
}, {versionKey: false});
//新建adminSchema model
var Admin = mongoose.model("Admin", adminSchema);
//对adminNames中的每一个字符串进行录入数据库操作 
adminNames.forEach(function (adminName) {
	//A model is a class with which we construct documents. 
	//将adminName赋给一个新的doc
    var admin = new Admin({
        name: adminName
    });
    //将之存入数据库
    admin.save(function (err, data) {
        if (err) console.log(err);
    })
});

var botSchema = new mongoose.Schema({
    name: String
}, {versionKey: false});

var Bot = mongoose.model("Bot", botSchema);
// Bot.remove({}, function () {});

botNames.forEach(function (botName) {
    console.log(botName);
    var bot = new Bot({
        name: botName
    });

    bot.save(function (err, data) {
        if (err) console.log(err);
    })
});

