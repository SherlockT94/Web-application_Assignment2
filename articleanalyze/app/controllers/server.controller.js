/**
 * 
 */
var express = require('express')
var loginmodel = require('../models/login_model')
var registermodel= require('../models/register_model')
module.exports.showmainpage = function(req,res){
	res.render('mainpage.pug');
}	
module.exports.login= function(req,res){
	 username=req.body.username;
	 password=req.body.password;
	 console.log(username,password);
	 loginmodel.passwordverify(username, function(err,result){
			//console.log(result)
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
			console.log(newregister);
			newregister.save();
			res.send('nouser');
		}
		else
		{
			
			res.send("haveuser");
		}
		
	})	
	
}	