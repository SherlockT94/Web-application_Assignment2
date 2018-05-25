/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var initial_drawschema = new mongoose.Schema(
		{
			title:String,
			numberofrevisions:String
		},
		 {
		 	versionKey: false
		})



var Initial_draw = mongoose.model('Initial_draw', initial_drawschema, 'revisions');

module.exports = Initial_draw