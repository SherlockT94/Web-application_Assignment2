/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var article_detail_schema = new mongoose.Schema(
		{
			number:String,
			user:String
		},
		 {
		 	versionKey: false
		})

article_detail_schema.statics.most_revision_user = function(title,callback){
	return this.aggregate([
		{$match:{title:title, usertype:'regular'}},
		{$group:{_id:{user:'$user'}, number:{$sum:1}}},
		{$project:{_id:0,user:'$_id.user',number:1}},
		{$sort:{number:-1}},
		{$limit:5}
		]).exec(callback)
	
	}
var Article_detail = mongoose.model('Article_detail', article_detail_schema, 'revisions');

module.exports = Article_detail