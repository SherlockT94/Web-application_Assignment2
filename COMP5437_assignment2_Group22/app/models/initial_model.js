/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WikiLatic', function () {
  console.log('mongodb connected')
});

var initialschema = new mongoose.Schema(
		{
			title:String,
			NumOfRevisions:String
		},
		 {
		 	versionKey: false
		})

initialschema.statics.mostrevisions = function(callback){
	return this.aggregate([
		{$match:{}},
		{$group:{_id:'$title', NumOfRevisions:{$sum:1}}},
		{$sort:{NumOfRevisions:-1}},
		{$limit:3}
		]).exec(callback)
	
	}
initialschema.statics.leastrevisions = function(callback){
	return this.aggregate([
		{$match:{}},
		{$group:{_id:'$title', NumOfRevisions:{$sum:1}}},
		{$sort:{NumOfRevisions:1}},
		{$limit:3}
		]).exec(callback)
	
	}
initialschema.statics.longhistory = function(callback){
	return this.aggregate([
		{$group:{_id:'$title', mintimestamp:{$min:'$timestamp'}}},
		{$sort:{mintimestamp:1}},
		{$limit:3}
		]).exec(callback)
	}
initialschema.statics.shorthistory = function(callback){
	return this.aggregate([
		{$group:{_id:'$title', mintimestamp:{$min:'$timestamp'}}},
		{$sort:{mintimestamp:-1}},
		{$limit:3}
		]).exec(callback)
	}
initialschema.statics.mostuser = function(callback){
	return this.aggregate([
		{$group:{_id:{title:'$title',user:'$user'},NumOfUser:{$sum:1}}},
		{$group:{_id:{title:'$_id.title'},NumOfUser:{$sum:1}}},
		{$project:{_id:0, title:'$_id.title', NumOfUser:1}},
		{$sort:{NumOfUser:-1}},
		{$limit:1}
		]).exec(callback)
	}
initialschema.statics.leastuser = function(callback){
	return this.aggregate([
		{$group:{_id:{title:'$title',user:'$user'},NumOfUser:{$sum:1}}},
		{$group:{_id:{title:'$_id.title'},NumOfUser:{$sum:1}}},
		{$project:{_id:0, title:'$_id.title', NumOfUser:1}},
		{$sort:{NumOfUser:1}},
		{$limit:1}
		]).exec(callback)
	}

var Initial = mongoose.model('Initial', initialschema, 'revisions');

module.exports = Initial