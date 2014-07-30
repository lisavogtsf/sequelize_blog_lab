
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
  res.redirect('/blog');
});

app.get('/blog', function(req, res){
  db.post.findAll().success(function(posts){
    res.render('index', {posts: posts});
  })
})

app.get('/blog/new', function(req, res){
  db.author.findAll().success(function(authors){
    res.render('new', {scribblers: authors});    
  })
})

app.post('/blog/new', function(req, res){
  console.log("req.body", req.body);
  db.author.find({ where: {id: req.body.blogger} }).success(function(authorObj) {   
    db.post.create({content: req.body.content, authorId: authorObj.id})
      .success(function(postObj){
        console.log("postObj: ", postObj.dataValues);
        console.log("authorObj", authorObj);
      })
  })
  res.redirect('/blog/new');
});

// route to specific post by author
app.get('/blog/:authorId/:id', function(req, res){
  var authorId = req.params.authorId;
  var postId = req.params.id;

  db.author.find({where: {id: authorId}})
    .success(function(authorObj){
      db.post.find({where: {id: postId}})
        .success(function(postObj){
          res.render('show', {post: postObj, author: authorObj});          
        })
    })
});

// add an author?
// edit a post?
// delete a post?




app.listen(3000);