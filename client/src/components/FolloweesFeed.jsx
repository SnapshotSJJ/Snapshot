import React from 'react';
import Post from './Post.jsx';

const FolloweesFeed = (props) => {
  
    return (
      <div>
        {props.posts.map((post, index) => <Post key={index} post={post} userId={props.userId} /> )}
      </div>
    );
  
};

export default FolloweesFeed;
