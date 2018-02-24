const { sequelize, User, Post, Comment } = require('../db/orm.js');

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

		getFollowersPosts: (req, res) => {
			console.log('test')
		},

		postSingleComment: (req, res) => {
			console.log('what the heck')
		},

		likeSinglePost: (req, res) => {
			console.log('fun town')
		},
	}
}