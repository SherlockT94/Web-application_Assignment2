var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var analysis=require('./app/routes/routes')
app.set('views',path.join(__dirname, 'app','views'));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.get('/',function(req,res){
    res.render('mainpage');
});
app.get('/articles/add', function(req,res){
    res.render('analysepage');
})
app.set('views', path.join(__dirname,'app/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/',analysis);

app.listen(3000, function(){
    console.log('server started on port 3000...');
});