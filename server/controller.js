
const { sequelize, User, Post, Comment } = require('../db/orm.js');
const fs = require('fs');

module.exports = {

	users: {

		followSingleUser: (req, res) => {
			console.log('im here')
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
			sequelize.query(`select posts.id, img_src, users.name
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
			console.log('what the heck')
		},

		likeSinglePost: (req, res) => {
			console.log('fun town')
		},
	}
}