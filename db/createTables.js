const { User, Comment, Post, User_Like, Follow } = require('./orm.js');

/** 
 * Start data
*/
const usersData = [
  {
    name: "bob"
  },
  {
    name: "carol"
  },
  {
    name: "ben"
  },
  {
    name: "carl"
  },
  {
    name: "jen"
  },
  {
    name: "Samuel Hong"
  }
];

const postsData = [
  {
    img_src: 'https://media1.fdncms.com/stranger/imager/u/original/25468838/more.jpg',
    user_id: 1,
    like_count: 3,
    title: 'Having lots of fun!'
  },
  {
    img_src: 'http://www.redbeanieproject.com/wp-content/uploads/2014/06/RBP-Wonderland-350x350.jpg',
    user_id: 6,
    like_count: 0
  },
  {
    img_src: 'https://render.fineartamerica.com/images/images-profile-flow/350/images/artworkimages/medium/1/hawaii-mn6367-mikes-nature.jpg',
    user_id: 2,
    like_count: 0,
    title: 'wish you were here'
  },
  {
    img_src: 'https://media.consumeraffairs.com/files/cache/news/Sgt_Peppers_Lonele_Hearts_Club_band_via_Wikimedia_Commons_medium.jpg',
    user_id: 3,
    like_count: 0,
    title: 'give me likes'
  },
  {
    img_src: 'https://www.vettix.org/images/events/preview16525_1408158639.jpg',
    user_id: 4,
    like_count: 0,
    title: 'cool pic!'
  },
  {
    img_src: 'http://www.schoolpsychjobs.com/img/city-photos/los-angeles-1.jpg',
    user_id: 5,
    like_count: 0,
    title: 'throwback thursday!'
  },
  {
    img_src: 'https://render.fineartamerica.com/images/images-profile-flow/350/images-medium-large-5/los-angeles-skyline-at-sunset-konstantin-sutyagin.jpg',
    user_id: 1,
    like_count: 0,
    title: 'nice comments only, plz'
  },
  {
    img_src: 'https://consequenceofsound.files.wordpress.com/2018/02/david-bowie-aladdin-sane-changestwobowie-reissues.jpg?quality=80&w=350&h=350&crop=1',
    user_id: 2,
    like_count: 0,
    title: 'another photo'
  },
  {
    img_src: 'https://scontent-frx5-1.cdninstagram.com/vp/1ad363ef2d217ad57a0bfb5ecb8c2cde/5B1AD04D/t51.2885-15/e35/c74.0.350.350/27879631_173408493295894_6436037531329888256_n.jpg',
    user_id: 3,
    like_count: 0,
    title: 'this is the best picture!'
  },
  {
    img_src: 'https://www.out.com/sites/out.com/files/2012/05/14/Kindness-AdamBainbridge-main_0.jpg',
    user_id: 4,
    like_count: 0,
    title: 'don\'t click me'
  },
  {
    img_src: 'https://render.fineartamerica.com/images/images-profile-flow/350/images/artworkimages/medium/1/sm4577-mikes-nature.jpg',
    user_id: 5,
    like_count: 0,
    title: 'this is the last one'
  }
];

const commentsData = [
  {
    text: 'how is it going?',
    user_id: 1,
    post_id: 1
  },
  {
    text: 'not good',
    user_id: 2,
    post_id: 1
  },
  {
    text: 'how is it going?',
    user_id: 3,
    post_id: 2
  },
  {
    text: 'well',
    user_id: 4,
    post_id: 2
  },
  {
    text: 'how is it going?',
    user_id: 5,
    post_id: 3
  },
  {
    text: 'better',
    user_id: 1,
    post_id: 3
  },
  {
    text: 'how is it going?',
    user_id: 1,
    post_id: 5
  },
  {
    text: 'stop asking please',
    user_id: 1,
    post_id: 5
  },
  {
    text: 'how is it going?',
    user_id: 3,
    post_id: 6
  },
  {
    text: 'bots',
    user_id: 2,
    post_id: 6
  },
  {
    text: 'how is it going?',
    user_id: 5,
    post_id: 7
  },
  {
    text: 'reporting',
    user_id: 2,
    post_id: 7
  },
  {
    text: 'how is it going?',
    user_id: 1,
    post_id: 1
  },
  {
    text: 'how is it going?',
    user_id: 1,
    post_id: 1
  },
  {
    text: 'how is it going?',
    user_id: 1,
    post_id: 1
  }
];

const userLikesData = [
  {
    user_id: 1,
    post_id: 1
  },
  {
    user_id: 2,
    post_id: 1
  },
  {
    user_id: 3,
    post_id: 1
  }
];

const followsData = [
  {
    user_id: 1,
    follow_id: 2,
    accepted: 0
  },
  {
    user_id: 1,
    follow_id: 3,
    accepted: 1
  },
  {
    user_id: 1,
    follow_id: 4,
    accepted: 0
  },
  {
    user_id: 2,
    follow_id: 1,
    accepted: 1
  },
  {
    user_id: 2,
    follow_id: 4,
    accepted: 0
  },
  {
    user_id: 2,
    follow_id: 5,
    accepted: 1
  }
];

/** 
 * End start data
*/

User.sync({force: false}).then(() => {
  return User.bulkCreate(usersData)
    .then(() => {
      console.log('updated users');
      return createPostsTable();
    })
    .then(() => {
      return createCommentsTable();
    })
    .then(() => {
      return createLikesTable();
    })
    .then(() => {
      return createFollowsTable();
    })
  });
  
const createPostsTable = () => {
  Post.sync({force: false}).then(() => {
    return Post.bulkCreate(postsData)
      .then(() => {
        console.log('updated posts')
      })
  });
}

const createCommentsTable = () => {
  Comment.sync({force: false}).then(() => {
    return Comment.bulkCreate(commentsData)
      .then(() => {
        console.log('updated comments')
      })
  });
}

const createLikesTable = () => {
  User_Like.sync({force: false}).then(() => {
    return User_Like.bulkCreate(userLikesData)
      .then(() => {
        console.log('updated user likes')
      });
  });
}

const createFollowsTable = () => {
  Follow.sync({force: false}).then(() => {
    return Follow.bulkCreate(followsData)
      .then(() => {
        console.log('updated follows')
      });
  });
}
