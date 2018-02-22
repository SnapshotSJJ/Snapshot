import React from 'react';

const Comments = (props) => {
  if (props.displayMessages) {
    return (
      <div>
        {props.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </div>
    )
  }
  return null;
}

export default Comments;