
var express = require('express'),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
  lodash = require('lodash'),
  pg = require('pg'),
  sequelize = require('sequelize'),
  methodOverride = require('method-override'),
  db = require('./models/index.js');

var app = express();

app.set('view-engine', 'ejs');
// CSS?
app.use(express.static(__dirname + '/public'));
// console.log(__dirname);
// middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

app.get('/', function(req, res){
  // res.send("Try /posts");
  res.redirect('/posts');
});

app.get('/posts', function(req, res){
  db.post.findAll().success(function(posts){
    res.render('index.ejs', {posts: posts});
  })
})









app.listen(3000);