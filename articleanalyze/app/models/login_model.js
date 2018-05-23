var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var loginschema = new mongoose.Schema(
		{
		 firstname: String,
		 lastname:String, 
		 emailaddress:String, 
		 username:String,
		 password:String
		 },
		 {
		 	versionKey: false
		})



loginschema.statics.passwordverify = function(username,callback){
	
	return this.find({'username':username})
	.limit(1)
	.exec(callback)
	}

var Login = mongoose.model('Login', loginschema, 'userinfo');

module.exports = Login

