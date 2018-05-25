/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var initialschema = new mongoose.Schema(
		{
			title:String,
			numberofrevisions:String
		},
		 {
		 	versionKey: false
		})



var Initial = mongoose.model('Initial', initialschema, 'revisions');

module.exports = Initial