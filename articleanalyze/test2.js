/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var userinfoschema = new mongoose.Schema(
		{firstname: String, 
		 lastname:String, 
		 emailaddress:String, 
		 username:String,
		 password:String},
		 {
		 	versionKey: false
		})

var Revision = mongoose.model('Revision', userinfoschema, 'userinfo');
Revision.find({'username':'petunia'})
	.limit(1)
	.exec(function(err,result){
	if (err){
		console.log("Query error!")
	}else{
		console.log("The earliest revision in CNN is:");
		console.log(result)
		console.log(result[0].password)
	}
});