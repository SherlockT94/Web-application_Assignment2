/**
 * 
 */
mytime=new Date()
a=mytime.getTime()
console.log(a)

var s1 = '2012-05-12';
s1 = new Date(s1.replace(/-/g, "/"));;
console.log(s1)
console.log(s1.getTime())