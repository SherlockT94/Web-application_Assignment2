var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var initial_individual_schema = new mongoose.Schema(
		{
			title: String,
			Numofrevision: String
		 },
		 {
		 	versionKey: false
		})

initial_individual_schema.statics.title_revision = function(callback){
	return this.aggregate([
		{$match:{}},
		{$group:{_id:'$title', NumOfRevisions:{$sum:1},timestamp: { $max: "$timestamp" }}},
		{$sort:{_id:1}},
		]).exec(callback)
	
	}


var initial_individual = mongoose.model('initial_individual', initial_individual_schema, 'revisions');

module.exports = initial_individual
