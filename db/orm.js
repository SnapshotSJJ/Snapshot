const Sequelize = require('sequelize');

const sequelize = new Sequelize('instagram', 'root', 'password', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 4,
    min: 0,
    acquire: 30000,
    idle: 10000,
    handleDisconnects: true,
    define: {
      timestamps: true
    }
  }
});

sequelize.authenticate().then(function() {
  console.log('You are connected to mysql Database on localhost');
}).catch(function(err) {
  console.log('Something went wrong, unable to connect to database: ', err);
});

/**
 * Schemas start
 */

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
},
{
  underscored: true
});

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  img_src: Sequelize.STRING,
},
{
  underscored: true
});

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: Sequelize.STRING,
},
{
  underscored: true
});

Comment.belongsTo(Post);
Comment.belongsTo(User);
Post.hasMany(Comment);
User.hasMany(Comment);
Post.belongsTo(User);
User.hasMany(Post);

module.exports.User = User;
module.exports.Post = Post;
module.exports.Comment = Comment;
