const router = require('express').Router();
const ctrl = require('./controller');

router.put('/users/follow/:username', ctrl.users.followSingleUser);

router.get('/users/all', ctrl.users.getFollowerList);

router.post('/posts/upload/submit', ctrl.posts.submitNewPost);

router.post('/users', ctrl.users.postUser);

// router.post('/posts/upload/upload', ctrl.posts.storeNewPost);

router.get('/posts/all', ctrl.posts.getAllPosts);

router.get('/posts/comments/:postID', ctrl.posts.getAllComments);

router.get('/posts/followers', ctrl.posts.getFollowersPosts);

router.post('/posts/comment/:postID', ctrl.posts.postSingleComment)

router.put('/posts/like/:postID', ctrl.posts.likeSinglePost);

router.put('/users/accept/:username', ctrl.users.acceptNewFollower);


module.exports = router;