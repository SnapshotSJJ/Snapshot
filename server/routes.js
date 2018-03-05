const router = require('express').Router();
const ctrl = require('./controller');

router.put('/users/follow/:userID', ctrl.users.followSingleUser);

router.get('/users/:userID/follows', ctrl.users.getFollowerList);

router.get('/users/:userID/accepted', ctrl.users.getAcceptedList);

router.post('/posts/upload/submit', ctrl.posts.submitNewPost);

router.post('/users', ctrl.users.postUser);

router.put('/users/accept/:userID', ctrl.users.acceptNewFollower);

router.put('/users/accepted/:userID', ctrl.users.acceptedFollower);

// router.post('/posts/upload/upload', ctrl.posts.storeNewPost);

router.get('/posts/all', ctrl.posts.getAllPosts);

router.get('/posts/followees/:userID', ctrl.posts.getFolloweesPosts)

router.get('/posts/comments/:postID', ctrl.posts.getAllComments);

router.get('/posts/followers/:userID', ctrl.posts.getFollowersPosts);

router.post('/posts/comment', ctrl.posts.postSingleComment)

router.put('/posts/like/:postID', ctrl.posts.likeSinglePost);



module.exports = router;