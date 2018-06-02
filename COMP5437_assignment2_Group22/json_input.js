var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
//read .json files
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
},{versionKey : false}); 
/*
 *The first argument is the singular name of the collection your model is for.
 *Mongoose automatically looks for the plural version of your model name.
 */
var Revision = mongoose.model('Revision', revisionschema);  

console.log("read directory");

count = 0;

 fs.readdir('./Dataset/revisions', function(err, files){
     if(err){
         return console.error(err);
     }
     //count = 1;
     files.forEach(function(file){
        //console.log(file);
        file_readed = fs.readFileSync(path.join('./Dataset/revisions',file)).toString();
        var obj = JSON.parse(file_readed);
        //console.log(obj);
        Revision.collection.insertMany(obj,function(error, docs) {
        	if(err){
        		return console.error(err);
        	}else{
                console.log('save success');
        	}
        })
        count++;
        if(count == 99){
            console.log('all .json file are saved to revisions');
        }
     })
 });