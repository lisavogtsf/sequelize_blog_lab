
var express = require('express'),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
  lodash = require('lodash'),
  pg = require('pg'),
  sequelize = require('sequelize'),
  methodOverride = require('method-override'),
  db = require('./models/index.js');

var app = express();

app.set('view engine', 'ejs');
// CSS?
app.use(express.static(__dirname + '/public'));
console.log(__dirname);
// middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

app.get('/', function(req, res){
  // res.send("Try /posts");
  res.redirect('/posts');
});

app.get('/posts', function(req, res){
  db.post.findAll().success(function(posts){
    res.render('index', {posts: posts});
  })
})

app.get('/posts/new', function(req, res){
  db.author.findAll().success(function(authors){
    res.render('new', {scribblers: authors});    
  })
})

app.post('/posts/new', function(req, res){
  console.log("req.body", req.body);
  db.author.findOrCreate({name: req.body.authorName})
  .success(function(authorObj){
    db.post.create({content: req.body.postContent})
      .success(function(postObj){
      // console.log("postObj: ", postObj.dataValues);
      // console.log("authorObj", authorObj);
      authorObj.addPost(postObj);
      res.render('index');
    });
  });
});

// add an author?

// edit a post?
// delete a post?




app.listen(3000);