var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// Associations
db.author.hasMany(db.post);
db.post.belongsTo(db.author);

// db.post.create({content: "Hello World"})
//   .success(function(postObj){
//     console.log("postObj: ", postObj);
//   });

// db.author.create({name: "George Eliot"})
//   .success(function(authorObj){
//     console.log("authorObj: ", authorObj);
//   })

// getPosts and push new one onto that?
// project.setTasks([task1, task2]).success(function() {

// })
// project.getTasks().success(function(associatedTasks) {

// })

// author.setPosts([task1, task2]).success(function() {

// })
// author.getPosts().success(function(associatedTasks) {

// })

// new try in class
db.author.find(1).success(function(foundAuthor){
  var newPost = db.post.build({title: "hello worlds again!"});
  foundAuthor.addPost(newPost).success(function(){
    newPost.save()
  })
}); 



// // delmer in class
// db.author.hasMany(db.post);
// db.post.belongsTo(db.author);

// db.author.build({name: "Proust"}).save();
// db.author.find(1).success(
//   function(author){
//     var newPost = db.post.build({title: "hello world"})
//     author.setPosts([newPost]).success(
//       function(){
//         newPost.save();
//       }
//     )
//   }
// )

// // how I was doing it, didn't work, ids not sticky
// db.post.create({content: "Literature"})
//   .success(function(post){
//     db.author.find(3).success(function(author){
//       author.setPosts([post])
//         .success(function(author){
//          console.log("Author: " + author + " Post:" + post);
//       })
//     });
// });

// db.post.find(1).success(function(post){
//   console.log("found post: ", post);

//   post.destroy().success(function(){
//     console.log()
//   })
// })





module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
