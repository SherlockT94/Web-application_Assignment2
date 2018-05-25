var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia', function () {
  console.log('mongodb connected')
});

var initialschema = new mongoose.Schema(
		{
			title: String, 
			user:String,
		}
		 ,
		 {
		 	versionKey: false
		})

var initial = mongoose.model('initial', initialschema, 'revisions');
var c
var d
var promise1= new Promise(function(resolve,reject){
	initial.aggregate([
		{$match:{}},
		{$group:{_id:'$title', NumOfRevisions:{$sum:1}}},
		{$sort:{NumOfRevisions:-1}},
		{$limit:3}
		], function (err, results) 
		{
		    if (err) 
		    {
		        console.log(err)
		    } else 
		    {
		    	c=results;
		       console.log(results);
		       resolve(results)
		    }
		}
	)
})
var promise2= new Promise(function(resolve,reject){
	initial.aggregate([
			{$match:{}},
			{$group:{_id:'$title', NumOfRevisions:{$sum:1}}},
			{$sort:{NumOfRevisions:1}},
			{$limit:3}
			], function (err, results) {
		    if (err) {
		        console.log(err)
		    } else {
		    	d=results;
		       console.log(results);
		       resolve(results)
		    }
		})
	})
promise1.then(function(){return promise2}).then(function(){c=c.concat( d );console.log(c)})