var fs = require("fs");
var adminPath = "./Dataset/Admin.txt";
var botPath = "./Dataset/Bot.txt";
//异步读取不会阻塞下面代码的执行, 同步读取会阻塞下面代码的执行
var adminNames = fs.readFileSync(adminPath).toString().split(/\r?\n/ig);
var botNames = fs.readFileSync(botPath).toString().split(/\r?\n/ig);
//console.log(adminNames);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WikiLatic', function () {
    console.log('mongodb connected')
});

var revisionschema = new mongoose.Schema({
    revid: String,
    parentid: String,
    minor: String,
    user: String,
    timestamp: String,
    size: String,
    sha1: String,
    parsedcomment: String,
    title: String,
    usertype: String
})

var Revision = mongoose.model("Revision",revisionschema,"revisions");


botNames.forEach(function(botName){
    var condition = {user:botName}
    var update = {$set:{usertype:"bot"}}
    var multi = {multi: true}
    Revision.update(condition,update,multi,function(error){
        if(error){
            console.log(error)
        }
        else{
            console.log("bot success")
        }
    })
})

adminNames.forEach(function(adminName){
    var condition = {user:adminName}
    var update = {$set:{usertype:"admin"}}
    var multi = {multi: true}
    Revision.update(condition,update,multi,function(error){
        if(error){
            console.log(error)
        }
        else{
            console.log("admin success")
        }
    })
})

Revision.update({anon:{$exists:true}},{$set:{usertype:"anon"}},{multi:true},function(error){
    if(error){
        console.log(error)
    }else{
        console.log("anon success")
    }
})

Revision.update({usertype:{$exists:false}},{$set:{usertype:"regular"}},{multi:true},function(error){
    if(error){
        console.log(error)
    }else{
        console.log("regular success")
    }
})



