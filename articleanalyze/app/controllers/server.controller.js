/**
 * 
 */
var request = require('request')
var express = require('express')
var loginmodel = require('../models/login_model')
var registermodel= require('../models/register_model')
var initialmodel=require('../models/initial_model')
var initial_drawmodel=require('../models/initial_draw_model')
var initial_individual_model=require('../models/initial_individual_model')
var article_detail_model=require('../models/article_detail_model')
var article_draw_model=require('../models/article_draw_model')
var initial_author_model=require('../models/initial_author_model')
var author_detail_model=require('../models/author_detail_model')
var author_title_model=require('../models/author_title_model')
var update_model=require('../models/update_model')
module.exports.showmainpage = function(req,res){
	res.render('mainpage.pug');
}
//给最短和最长时间记录一下
var early_year
//这个数组用来筛选top5
var top5_draw
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
		else if(result.length!=0)
		{
			
			res.send("haveuser");
		}
		
	})	
	
}
//初始化主界面
module.exports.initial = function(req,res){
	var j_most_revision;
	var j_least_revision;
	var j_long_history;
	var j_short_history;
	var j_send;
	//最多revision
	var promise1= new Promise(function(resolve,reject){
		initialmodel.mostrevisions(
			function (err, results) 
			{
			    if (err) 
			    {
			        console.log(err)
			    } else 
			    {
			       j_most_revision=results;
			       //console.log(results);
			       resolve(results)
			    }
			})
	})
	//最少revision
	var promise2= new Promise(function(resolve,reject){
		initialmodel.leastrevisions(
				function (err, results) {
				    if (err) {
				        console.log(err)
				    } else {
				       j_least_revision=results;
				       //console.log(results);
				       resolve(results)
				    }
				})
		})
	//最长历史
	var promise3= new Promise(function(resolve,reject){
		initialmodel.longhistory(
				function (err, results) {
				    if (err) {
				        console.log(err)
				    } else {
				       j_long_history=results;
				       //console.log(results);
				       resolve(results)
				       early_year=results[0].mintimestamp.substring(0,4)
				       //console.log(early_year)
				    }
				})
		})
	//最短历史
	var promise4= new Promise(function(resolve,reject){
		initialmodel.shorthistory(
			function (err, results) {
			    if (err) {
			        console.log(err)
			    } else {
			       j_short_history=results;
			       //console.log(results);
			       resolve(results)
				   //console.log(late_year)
			    }
			})
		})
	//最多人修改
	var promise5= new Promise(function(resolve,reject){
		initialmodel.mostuser(
			function (err, results) {
			    if (err) {
			        console.log(err)
			    } else {
			       j_most_user=results;
			       //console.log(results);
			       resolve(results)
			    }
			})
		})
	//最少人修改
	var promise6= new Promise(function(resolve,reject){
		initialmodel.leastuser(
			function (err, results) {
			    if (err) {
			        console.log(err)
			    } else {
			       j_least_user=results;
			       //console.log(results);
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
			//console.log(j_send);
			res.send(j_send);
			});
}

//初始化画图
module.exports.initial_draw = function(req,res)
{
	initial_drawmodel.getjson(function(err,result){
		//console.log(result)
		if (err){
			console.log("Cannot find " + name + ", please try again!");

		}
	var send=[]
	for(year=Number(early_year);year<=2018;year++)
	{
		temp={year:year,admin:0,bot:0,anon:0,regular:0}
		send.push(temp)
	}
	for(j=0;j<result.length;j++)
	{
		//console.log(result[j])
		//console.log(result[j].timestamp)
		for(year=Number(early_year);year<=2018;year++)
		{
			//console.log(result[j].timestamp.substring(0,4))
			if(result[j].timestamp.substring(0,4)==year)
			{	
				if(result[j].usertype=="admin")
				{
					send[year-Number(early_year)].admin+=1
				}
				else if(result[j].usertype=="bot")
				{
					send[year-Number(early_year)].bot+=1
				}
				else if(result[j].usertype=="anon")
				{
					send[year-Number(early_year)].anon+=1
				}
				else if(result[j].usertype=="regular")
				{
					send[year-Number(early_year)].regular+=1
				}
			}
		}
	}
	console.log(send)
	res.send(send)
	})
	
}
//初始化individual
module.exports.initial_individual = function(req,res)
{
	initial_individual_model.title_revision(
		function (err, results) 
		{
		    if (err) 
		    {
		        console.log(err)
		    } else 
		    {
		       console.log(results);
		       res.send(results);
		    }
		})
		
	
	
}
module.exports.article_detail = function(req,res)
{
	title=req.body.title;
	article_detail_model.most_revision_user (title,function (err, results) 
	{
	    if (err) 
	    {
	        console.log(err)
	    } else 
	    {
	       console.log(results);
	       res.send(results);
	    }
	})
	//console.log(title);
}

//获得所有需要的画单篇文章的数据
module.exports.article_draw= function(req,res){
	title=req.body.title;
	//console.log(title)
	article_draw_model.articledata(title, function(err,result){
			console.log(result)
			if (err){
				console.log(err)

			}
			else if(result.length==0)
			{
				res.send('fail');
			}
			else
			{
				top5_draw=result
				var send=[]
				for(year=Number(early_year);year<=2018;year++)
				{
					temp={year:year,admin:0,bot:0,anon:0,regular:0}
					send.push(temp)
				}
				for(j=0;j<result.length;j++)
				{
					//console.log(result[j])
					//console.log(result[j].timestamp)
					for(year=Number(early_year);year<=2018;year++)
					{
						//console.log(result[j].timestamp.substring(0,4))
						if(result[j].timestamp.substring(0,4)==year)
						{	
							if(result[j].usertype=="admin")
							{
								send[year-Number(early_year)].admin+=1
							}
							else if(result[j].usertype=="bot")
							{
								send[year-Number(early_year)].bot+=1
							}
							else if(result[j].usertype=="anon")
							{
								send[year-Number(early_year)].anon+=1
							}
							else if(result[j].usertype=="regular")
							{
								send[year-Number(early_year)].regular+=1
							}
						}
						
					}
				}
				console.log(send)
				res.send(send)
			}
			
		})	
}
module.exports.top5_data = function(req,res)
{
	top1=req.body.top1
	top2=req.body.top2
	top3=req.body.top3
	top4=req.body.top4
	top5=req.body.top5
	//console.log(top1+top2+top3+top4+top5)
	var send=[]
	for(year=Number(early_year);year<=2018;year++)
	{
		temp={year:year}
		temp[top1]=0;temp[top2]=0;temp[top3]=0;temp[top4]=0;temp[top5]=0
		send.push(temp)
	}
	//console.log(send)
	for(i=0;i<top5_draw.length;i++)
	{
		//console.log(result[j])
		//console.log(result[j].timestamp)
		for(year=Number(early_year);year<=2018;year++)
		{
			//console.log(result[j].timestamp.substring(0,4))
			if(top5_draw[i].timestamp.substring(0,4)==year)
			{
				if(top5_draw[i].user==top1)
				{
					send[year-Number(early_year)][top1]+=1
				}
				else if(top5_draw[i].user==top2)
				{
					send[year-Number(early_year)][top2]+=1
				}
				else if(top5_draw[i].user==top3)
				{
					send[year-Number(early_year)][top3]+=1
				}
				else if(top5_draw[i].user==top4)
				{
					send[year-Number(early_year)][top4]+=1
				}
				else if(top5_draw[i].user==top5)
				{
					send[year-Number(early_year)][top5]+=1
				}
				
			}
		}
	}
	//console.log(send)
	res.send(send)
}
module.exports.initial_author = function(req,res)
{
	initial_author_model.userlist(function(err,result){
		//console.log(result)
		if (err){
			console.log("Cannot find " + name + ", please try again!");
			res.send('fail');

		}
		else
		{
			
			console.log(result)
			res.send(result);
		}
	})
	
}
module.exports.author_detail = function(req,res)
{
	author_name=req.body.author_name
	//res.send("received!")
	author_detail_model.user_detail(author_name,function(err,result){
		//console.log(result)
		if (err){
			console.log("Cannot find " + name + ", please try again!");
			res.send('fail');

		}
		else
		{
			
			//console.log(result)
			res.send(result);
		}
	})
	
}
module.exports.author_title = function(req,res)
{
	author_name=req.body.author_name
	//res.send("received!")
	author_title_model.user_title(author_name,function(err,result){
		//console.log(result)
		if (err){
			console.log("Cannot find " + name + ", please try again!");
			res.send('fail');

		}
		else
		{
			
			console.log(result)
			res.send(result);
		}
	})
	
}
module.exports.update = function(req,response)
{
	var count=0
	var wikiEndpoint = "https://en.wikipedia.org/w/api.php",

	title=req.body.title
	timestamp=req.body.timestamp
	var promise1= new Promise(function(resolve,reject){
    parameters = ["action=query",
    "format=json",
    "prop=revisions", "titles="+title, "rvstart="+timestamp, "rvdir=newer",
    "rvlimit=max",
    "rvprop=timestamp|userid|user|ids"]
	
	var url = wikiEndpoint + "?" + parameters.join("&");
	
	//console.log("url: " + url)
	var options = {
	    url: url,
	    Accept: 'application/json',
	    'Accept-Charset': 'utf-8'
	};
	
	request(options, function(err,res,data){
		if(err)
		{
			console.log("Error:",err);
		}
		else if(res.statusCode!==200)
		{
			console.log("Status",res.statusCode);
		}
		else
		{
			json=JSON.parse(data);
			pages=json.query.pages
			revisions=pages[Object.keys(pages)[0]].revisions
			//console.log("There are" + revisions.length + "revisions.");
			console.log(revisions)
			count=revisions.length
			console.log("count is"+count)
			for(i=0;i<revisions.length;i++)
			{
				var newupdate= new update_model({
					 revid:revisions[i].revid,
					 parentid:revisions[i].parentid, 
					 user:revisions[i].user, 
					 userid:revisions[i].userid,
					 timestamp:revisions[i].timestamp,
					 })
				//console.log(newregister);
				newupdate.save();
			}
			console.log("revisions length is"+revisions.length)
			resolve(count)
		}
	})
	})
	promise1.then(function(){
		console.log("count is"+count)
		response.send(count.toString())
	})
	
	
}