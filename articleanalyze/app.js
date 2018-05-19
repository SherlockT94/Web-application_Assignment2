var express = require('express');
var path = require('path');

var app = express();

app.set('views',path.join(__dirname, 'app','views'));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/',function(req,res){
    var articles = [
        {
            id:1,
            title:'article one',
            body:'the one'

        },
        {
            id:2,
            title:'article two',
            body:'the one'

        },
        {
            id:3,
            title:'article three',
            body:'the one'

        },
    ]
    res.render('mainpage', {
        title: 'Articles', articles: articles
    });
});

app.get('/articles/add', function(req,res){
    res.render('add_article', {
        title: 'Add Articles'
    });
})

app.listen(3000, function(){
    console.log('server started on port 3000...');
});