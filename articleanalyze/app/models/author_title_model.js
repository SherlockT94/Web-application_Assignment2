/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var author_title_schema = new mongoose.Schema(
		{
			user:String,
			timestamp:String,
			title:String
			
		},
		 {
		 	versionKey: false
		})

author_title_schema.statics.user_title = function(username,callback){
	return this.aggregate([
		{$match:{user:username}},
		{$group:{_id:"$title", numOfEdits: {$sum:1}}},
		{$sort:{numOfEdits:-1}}
		]).exec(callback)
	}
var Author_title = mongoose.model('Author_title', author_title_schema, 'revisions');

module.exports = Author_title