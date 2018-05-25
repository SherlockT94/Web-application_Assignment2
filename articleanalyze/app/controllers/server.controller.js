/**
 * 
 */
var express = require('express')
var loginmodel = require('../models/login_model')
var registermodel= require('../models/register_model')
var initialmodel=require('../models/initial_model')
var initial_drawmodel=require('../models/initial_draw_model')
module.exports.showmainpage = function(req,res){
	res.render('mainpage.pug');
}	
module.exports.login= function(req,res){
	 username=req.body.username;
	 password=req.body.password;
	 console.log(username,password);
	 loginmodel.passwordverify(username, function(err,result){
			console.log(result)
			if (err){
				console.log("Cannot find " + name + ", please try again!");
				res.send('fail');

			}
			else if(result.length==0)
			{
				res.send('nouser');
			}
			else
			{
				if(password==result[0].password)
				{
					//console.log("123");
					res.send('success');
					//res.render('analysepage');
				}
					
				else
				{
					res.send('fail');
				}
			}
			
		})	
}
module.exports.register = function(req,res){
	firstname=req.body.firstname;
	lastname=req.body.lastname;
	emailaddress=req.body.emailaddress;
	username=req.body.username;
	password=req.body.password;
	//console.log(firstname,lastname,emailaddress,username,password);
	//res.send("hello");
	registermodel.usernamecheck(username, function(err,result){
		//console.log(result)
		if (err){
			console.log("Cannot find " + name + ", please try again!");
			res.send('fail');

		}
		else if(result.length==0)
		{
			var newregister= new registermodel({
				 firstname:firstname,
				 lastname:lastname, 
				 emailaddress:emailaddress, 
				 username:username,
				 password:password,
				 })
			//console.log(newregister);
			newregister.save();
			res.send('nouser');
		}
		else
		{
			
			res.send("haveuser");
		}
		
	})	
	
}
module.exports.initial = function(req,res){
	var j_most_revision;
	var j_least_revision;
	var j_long_history;
	var j_short_history;
	var j_send;
	//最多revision
	var promise1= new Promise(function(resolve,reject){
		initialmodel.aggregate([
			{$match:{}},
			{$group:{_id:'$title', NumOfRevisions:{$sum:1}}},
			{$sort:{NumOfRevisions:-1}},
			{$limit:3}
			], 
			function (err, results) 
			{
			    if (err) 
			    {
			        console.log(err)
			    } else 
			    {
			       j_most_revision=results;
			       console.log(results);
			       resolve(results)
			    }
			})
	})
	//最少revision
	var promise2= new Promise(function(resolve,reject){
		initialmodel.aggregate([
				{$match:{}},
				{$group:{_id:'$title', NumOfRevisions:{$sum:1}}},
				{$sort:{NumOfRevisions:1}},
				{$limit:3}
				], 
				function (err, results) {
				    if (err) {
				        console.log(err)
				    } else {
				       j_least_revision=results;
				       console.log(results);
				       resolve(results)
				    }
				})
		})
	//最长历史
	var promise3= new Promise(function(resolve,reject){
		initialmodel.aggregate([
				{$group:{_id:'$title', mintimestamp:{$min:'$timestamp'}}},
				{$sort:{mintimestamp:1}},
				{$limit:3}
				], 
				function (err, results) {
				    if (err) {
				        console.log(err)
				    } else {
				       j_long_history=results;
				       console.log(results);
				       resolve(results)
				    }
				})
		})
	//最短历史
	var promise4= new Promise(function(resolve,reject){
		initialmodel.aggregate([
			{$group:{_id:'$title', mintimestamp:{$min:'$timestamp'}}},
			{$sort:{mintimestamp:-1}},
			{$limit:3}
			], 
			function (err, results) {
			    if (err) {
			        console.log(err)
			    } else {
			       j_short_history=results;
			       console.log(results);
			       resolve(results)
			    }
			})
		})
	//最多人修改
	var promise5= new Promise(function(resolve,reject){
		initialmodel.aggregate([
			{$group:{_id:{title:'$title',user:'$user'},NumOfUser:{$sum:1}}},
			{$group:{_id:{title:'$_id.title'},NumOfUser:{$sum:1}}},
			{$project:{_id:0, title:'$_id.title', NumOfUser:1}},
			{$sort:{NumOfUser:-1}},
			{$limit:1}
			], 
			function (err, results) {
			    if (err) {
			        console.log(err)
			    } else {
			       j_most_user=results;
			       console.log(results);
			       resolve(results)
			    }
			})
		})
	//最少人修改
	var promise6= new Promise(function(resolve,reject){
		initialmodel.aggregate([
			{$group:{_id:{title:'$title',user:'$user'},NumOfUser:{$sum:1}}},
			{$group:{_id:{title:'$_id.title'},NumOfUser:{$sum:1}}},
			{$project:{_id:0, title:'$_id.title', NumOfUser:1}},
			{$sort:{NumOfUser:1}},
			{$limit:1}
			], 
			function (err, results) {
			    if (err) {
			        console.log(err)
			    } else {
			       j_least_user=results;
			       console.log(results);
			       resolve(results)
			    }
			})
		})
	promise1.then(function(){return promise2}).then(function(){return promise3}).then(function(){return promise4}).then(function(){return promise5}).then(function(){return promise6}).then(function(){
			j_send=j_most_revision.concat(j_least_revision);
			j_send=j_send.concat(j_long_history);
			j_send=j_send.concat(j_short_history);
			j_send=j_send.concat(j_most_user);
			j_send=j_send.concat(j_least_user);
			console.log(j_send);
			res.send(j_send);
			});
}
module.exports.initial_draw = function(req,res)
{
	res.send("123")
}