
const { sequelize, User, Post, Comment, Follow } = require('../db/orm.js');
const fs = require('fs');

module.exports = {

	users: {

		followSingleUser: (req, res) => {

			Follow.findOrCreate({where: {
																		user_id: req.body.user_id,
																		follow_id: req.body.follow_id}})
				.spread((user, created) => {
					if (created) {
						res.status(204).send(JSON.stringify('success!'));
					} else {
						res.status(409).send(JSON.stringify('already exists'));
					}
				})
		},

		getFollowerList: (req, res) => {
			console.log('lol')
		},

		acceptNewFollower: (req, res) => {
			console.log('hey')
		},

		postUser: (req, res) => {
			User.findOrCreate({where: {name: req.body.user}})
				.spread((user, created) => {
					res.status(201).send(JSON.stringify(user.dataValues.id));
				})
		}
	},

	posts: {

		submitNewPost: (req, res) => {
			console.log('what')
		},


		// This function might not be needed. Can implement in submitNewPost
		// storeNewPost: (req, res) => {

		// },

		getAllPosts: (req, res) => {
			sequelize.query(`select posts.id, img_src, users.name, user_id
											 from posts inner join users
											 where users.id=user_id;`, { type: sequelize.QueryTypes.SELECT })
				.then((posts) => {
					res.status(200).send(posts);
				})
		},

		getAllComments: (req, res) => {
			sequelize.query(`select users.name, text
											 from comments join users
											 where users.id=user_id
											 and post_id=${req.params.postID}`, { type: sequelize.QueryTypes.SELECT })
				.then((comments) => {
				res.status(200).send(comments);
				})
		},

		getFollowersPosts: (req, res) => {
			let userID =  req.params.userID;
			let query = `SELECT img_src FROM posts WHERE user_id IN (SELECT id FROM users where id="${userID}")`

			sequelize.query(query, {type: sequelize.QueryTypes.SELECT}).then( (posts) => {
				res.status(200).send(posts);
			});
		},

		postSingleComment: (req, res) => {

			let username = ''; //req.body.username
			let postID = req.params.postID; 
			let userID = 2; //req.body.userID
			let text =  'hello';
			
			Comment.create({
				text: text,
				user_id: userID,
				post_id: postID,
			}).then( (comment) => {
					res.send(comment);
				});
		},

		likeSinglePost: (req, res) => {
			console.log('fun town')
		},
	}
}