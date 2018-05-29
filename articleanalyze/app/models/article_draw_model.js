/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var article_draw_schema = new mongoose.Schema(
		{
			title:String,
			timestamp:String,
			usertype:String,
			user:String
		},
		 {
		 	versionKey: false    
		})

article_draw_schema.statics.articledata = function(title,callback){
	return this.find({'title':title},{title:1,usertype:1,timestamp:1,user:1})
	.exec(callback)
	}
var Article_draw = mongoose.model('Article_draw', article_draw_schema, 'revisions');

module.exports = Article_draw