
const { sequelize, User, Post, Comment, Follow, User_Like } = require('../db/orm.js');
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
			sequelize.query(`select user_id, users.name from follows join users
											 where users.id=user_id and follow_id = ${req.params.userID} and accepted=0;`, { type: sequelize.QueryTypes.SELECT })
				.then((requests) => {
					res.status(200).send(requests);
				});
		},

		acceptNewFollower: (req, res) => {
			Follow.update({ accepted: 1 },
										{ where: 
										{ user_id: req.body.user_id,
											follow_id: req.params.userID }})
				.then((request) => {
					if (request) {
						res.status(204).send(JSON.stringify('success!'));
					} else {
						res.status(404).send(JSON.stringify('resource not found'));
					}
				})
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
			// console.log('inside submitNewPost: ', req.body)
			let username =  req.body.name;
			let query = `SELECT id FROM users WHERE name="${username}"`

			sequelize.query(query, {type: sequelize.QueryTypes.SELECT}).then(
				(id) => {
					Post.create({
						img_src: req.body.img_src,
						like_count: req.body.like_count,
						title: req.body.title,
						user_id: id[0].id
					}).then(() => {res.status(201).send(console.log('Successfully stored post to database!'))})
				}
			)
			
		},


		// This function might not be needed. Can implement in submitNewPost
		// storeNewPost: (req, res) => {

		// },

		getAllPosts: (req, res) => {
			sequelize.query(`select posts.id, img_src, users.name, user_id, like_count
											 from posts inner join users
											 where users.id=user_id order by id desc;`, { type: sequelize.QueryTypes.SELECT })
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

		getFolloweesPosts: (req, res) => {

			let user = 1; //req.params.userID

			sequelize.query(`select img_src from posts
											 where user_id in 
											 (select follow_id from follows where user_id=${user})`, { type: sequelize.QueryTypes.SELECT })
				.then((posts) => {
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
			// Check to see if user already liked post
			User_Like.findOrCreate({where: {user_id: req.body.user_id, post_id: req.params.postID}})
				.spread((_, created) => {
					if (!created) {
						res.status(409).send(JSON.stringify('Already liked'))
					} else {
						// Update post likes by one
						Post.findById(Number(req.params.postID))
							.then((post) => {
								return post.increment('like_count', { by: 1 })
							})
							.then(() => {
								res.status(201).send(JSON.stringify('Success!'))
							});
					}
				});
		},
	}
}