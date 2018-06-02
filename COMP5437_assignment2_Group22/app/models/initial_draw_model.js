/**
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WikiLatic', function () {
  console.log('mongodb connected')
});

var initial_drawschema = new mongoose.Schema(
		{
			timestamp:String,
			usertype:String
		},
		 {
		 	versionKey: false
		})
initial_drawschema.statics.getjson = function(callback){
	
	return this.find({},{timestamp:1, usertype:1})
	.exec(callback)
	}


var Initial_draw = mongoose.model('Initial_draw', initial_drawschema, 'revisions');


//Initial_draw.getjson(function(err,result){
//	//console.log(result)
//	if (err){
//		console.log("Cannot find " + name + ", please try again!");
//
//	}
//var send=[]
//for(year=2001;year<=2018;year++)
//{
//	temp={year:year,admin:0,bot:0,anon:0,regular:0}
//	send.push(temp)
//
//}
//console.log(send)
//for(j=0;j<200;j++)
//{
//	//console.log(result[j])
//	//console.log(result[j].timestamp)
//	for(year=2001;year<=2018;year++)
//	{
//		//console.log(result[j].timestamp.substring(0,4))
//		if(result[j].timestamp.substring(0,4)==year)
//		{	
//			if(result[j].usertype=="admin")
//			{
//				send[year-2001].admin+=1
//			}
//			else if(result[j].usertype=="bot")
//			{
//				send[year-2001].bot+=1
//			}
//			else if(result[j].usertype=="anon")
//			{
//				send[year-2001].anon+=1
//			}
//			else if(result[j].usertype=="regular")
//			{
//				send[year-2001].regular+=1
//			}
//		}
//	}
//}
//console.log(send)
////console.log(send)
//})

//console.log(send)

module.exports = Initial_draw