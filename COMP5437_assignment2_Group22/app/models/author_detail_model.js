/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WikiLatic', function () {
  console.log('mongodb connected')
});

var author_detail_schema = new mongoose.Schema(
		{
			user:String,
			timestamp:String,
			title:String
			
		},
		 {
		 	versionKey: false
		})

author_detail_schema.statics.user_detail = function(username,callback){
	return this.find({'user':username},{timestamp:1,title:1})
	.exec(callback)
	
	}
var Author_detail = mongoose.model('Author_detail', author_detail_schema, 'revisions');

module.exports = Author_detail