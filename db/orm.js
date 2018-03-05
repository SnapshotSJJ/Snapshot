const Sequelize = require('sequelize');


const sequelize = new Sequelize('instagram', 'root', null, {
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
  title: Sequelize.STRING,
  like_count: { type: Sequelize.INTEGER, defaultValue: 0 }
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

const Follow = sequelize.define('follow', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  follow_id: Sequelize.INTEGER,
  accepted: { type: Sequelize.INTEGER, defaultValue: 0 },
  seen: { type: Sequelize.INTEGER, defaultValue: 0 },
},
{
  underscored: true
})

const User_Like = sequelize.define('user_like', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
},
{
  underscored: true
})

Comment.belongsTo(Post);
Comment.belongsTo(User);
Post.hasMany(Comment);
User.hasMany(Comment);
Post.belongsTo(User);
User.hasMany(Post);
User.hasMany(Follow);
Follow.belongsTo(User);
Post.hasMany(User_Like);
User.hasMany(User_Like);
User_Like.belongsTo(User);
User_Like.belongsTo(Post);


module.exports.User = User;
module.exports.Post = Post;
module.exports.Comment = Comment;
module.exports.Follow = Follow;
module.exports.User_Like = User_Like;
module.exports.sequelize = sequelize;
