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

// // more associations review
// db.author.find(1).success(function(foundAuthor){
// var newPost = db.post.build({content: "hello worlds again!"});
// foundAuthor.addPost(newPost).success(function(arg){
//   console.log("arg", arg);
//   console.log("newPost", newPost)
//   newPost.save().then(function(post){
//       console.log(post);
//   })
// })
// });


db.post.create({content: "Such an exciting post"})
  .success(function(postObj){
    console.log("postObj: ", postObj.dataValues);
    db.author.find(2).success(function(authorObj){
      console.log("authorObj", authorObj);
      authorObj.addPost(postObj);
    });

  });

// db.author.create({name: "Armistead Maupin"})
//   .success(function(authorObj){
//     console.log("authorObj: ", authorObj);
//   })

// // new try in class, note use of addPost
// // error, new post was null
// // now posting ok, author is null
// db.author.find(3).success(function(foundAuthor){
//   var newPost = db.post.build({content: "yowza!"});
//   foundAuthor.addPost(newPost).success(function(){
//     newPost.save();
//   })
// }); 



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

// // // how I was doing it, didn't work, ids not sticky
// db.post.create({content: "Light reading"})
//   .success(function(post){
//     db.author.find(4).success(function(author){
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
