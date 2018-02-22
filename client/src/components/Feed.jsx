import React from 'react';
import Post from './Post.jsx';

const Feed = (props) => {
  return (
    <div>
      <h3>Feed</h3>
      {props.posts.map((post, index) =>
        <Post key={index} post={post}/>
      )}
    </div>
  );
};

export default Feed;
