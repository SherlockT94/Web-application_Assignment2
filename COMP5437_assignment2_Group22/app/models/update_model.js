/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WikiLatic', function () {
  console.log('mongodb connected')
});

var update_schema = new mongoose.Schema(
		{
	     title:String,
		 revid:String,
		 parentid:String, 
		 user:String, 
		 userid:String,
		 timestamp:String},
		 {
		 	versionKey: false
		})



//registerschema.statics.register = function(firstname,lastname,emailaddress,username,password,callback){
//	
//	return this.insert({'firstname':firstname,'lastname':lastname,'emailaddress':emailaddress,'username':username,'password':password})
//	.exec(callback)
//	}

var Update = mongoose.model('Update', update_schema, 'revisions');

module.exports = Update