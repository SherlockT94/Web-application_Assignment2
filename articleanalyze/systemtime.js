/**
 * 
 */
s1='2009-03-28T04:54:52Z'
s2 = new Date();
s1=Date.parse(s1)
console.log(s1)
console.log(s2.getTime())
if((s1-s2)<1000*60*60*24)
{
	console.log("日期够了！")
}