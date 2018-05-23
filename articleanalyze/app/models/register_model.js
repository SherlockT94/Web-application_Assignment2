/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var registerschema = new mongoose.Schema(
		{
		 firstname:String,
		 lastname:String, 
		 emailaddress:String, 
		 username:String,
		 password:String},
		 {
		 	versionKey: false
		})



registerschema.statics.usernamecheck = function(username,callback){
	
	return this.find({'username':username})
	.limit(1)
	.exec(callback)
	}
//registerschema.statics.register = function(firstname,lastname,emailaddress,username,password,callback){
//	
//	return this.insert({'firstname':firstname,'lastname':lastname,'emailaddress':emailaddress,'username':username,'password':password})
//	.exec(callback)
//	}

var Register = mongoose.model('Register', registerschema, 'userinfo');

module.exports = Register