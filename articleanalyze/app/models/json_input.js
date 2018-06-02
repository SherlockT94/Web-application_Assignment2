var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
//read .json files
mongoose.connect('mongodb://localhost/text1', function () {
    console.log('mongodb connected111')


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
    anon:String
    // usertype: String
}); 

var Revision = mongoose.model('Revision', revisionschema, 'revision1');  

console.log("read directory");

count = 0;

fs.readdir('F:/COMP5347/assignment2/Dataset/revisions', function(err, files){
     if(err){
         return console.error(err);
     }
     //count = 1;
     files.forEach(function(file){
        //console.log(file);
        file_readed = fs.readFileSync(path.join('F:/COMP5347/assignment2/Dataset/revisions',file)).toString();
        var obj = JSON.parse(file_readed);
        if(count==2){
            console.log(obj)
        }
        //console.log(obj);
        // Revision.insertMany(obj);
        Revision.collection.insert(obj, function(err,doc){
            if(err){
                return console.error(err)
            }
            else{
                console.log('save success');
            }
        })
        
        count++;
        //console.log(obj);
     //    var Jdb = new Readj(obj);
     //    Jdb.save(function(err){
     //        console.log('save success')
     //        count++;
     //    })
        if(count == 99){
            console.log('all .json file are saved to revisions');
        }
     })
 });
});