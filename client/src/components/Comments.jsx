import React from 'react';

const Comments = (props) => {
  if (props.displayMessages) {
    return (
      <div>
        {props.comments.map((comment, index) => <li key={index}>{comment.name}: {comment.text}</li>)}
        <div>
          <input onChange={props.createComment} />
          <button>Submit</button>
        </div>
      </div>
    );
  }
  return null;
};

export default Comments;
