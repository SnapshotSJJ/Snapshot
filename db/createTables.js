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
  }
];

const postsData = [
  {
    img_src: 'https://vignette.wikia.nocookie.net/donthugme/images/d/d7/DHMIS_Globe.jpg/revision/latest?cb=20160105194405',
    user_id: 1,
    like_count: 3
  },
  {
    img_src: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Falcon_Heavy_cropped.jpg',
    user_id: 2,
    like_count: 0
  },
  {
    img_src: 'https://vignette.wikia.nocookie.net/donthugme/images/d/d7/DHMIS_Globe.jpg/revision/latest?cb=20160105194405',
    user_id: 3,
    like_count: 0
  },
  {
    img_src: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Falcon_Heavy_cropped.jpg',
    user_id: 4,
    like_count: 0
  },
  {
    img_src: 'http://i.imgur.com/cNtMFKx.jpg',
    user_id: 5,
    like_count: 0
  },
  {
    img_src: 'https://vignette.wikia.nocookie.net/donthugme/images/d/d7/DHMIS_Globe.jpg/revision/latest?cb=20160105194405',
    user_id: 1,
    like_count: 0
  },
  {
    img_src: 'http://i.imgur.com/cNtMFKx.jpg',
    user_id: 2,
    like_count: 0
  },
  {
    img_src: 'https://vignette.wikia.nocookie.net/donthugme/images/d/d7/DHMIS_Globe.jpg/revision/latest?cb=20160105194405',
    user_id: 3,
    like_count: 0
  },
  {
    img_src: 'http://img2-ak.lst.fm/i/u/arO/98141297cfc1480dc8d65a036457b0d9',
    user_id: 4,
    like_count: 0
  },
  {
    img_src: 'http://img2-ak.lst.fm/i/u/arO/98141297cfc1480dc8d65a036457b0d9',
    user_id: 5,
    like_count: 0
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
    follow_id: 2
  },
  {
    user_id: 1,
    follow_id: 3
  },
  {
    user_id: 1,
    follow_id: 4
  },
  {
    user_id: 2,
    follow_id: 1
  },
  {
    user_id: 2,
    follow_id: 4
  },
  {
    user_id: 2,
    follow_id: 5
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
