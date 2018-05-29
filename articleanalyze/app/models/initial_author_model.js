/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var initial_author_schema = new mongoose.Schema(
		{
			ID :String,
			user:String
			
		},
		 {
		 	versionKey: false
		})
initial_author_schema.statics.userlist = function(callback){
	
	return this.find({}).distinct('user')
	.exec(callback)
	}


var Initial_author = mongoose.model('nitial_author', initial_author_schema, 'revisions');

module.exports = Initial_author