// post.js

function Post(sequelize, DataTypes){
  return sequelize.define('post', {
    content: DataTypes.TEXT,
    authorId: {
              type: DataTypes.INTEGER,
              foreignKey: true
    }
  });
};

module.exports = Post;

