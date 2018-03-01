import React from 'react';

const FollowRequestEntry = (props) => {
  return (
    <div>
      <h3>{props.name}
        <button onClick={props.acceptFollowRequest.bind(null, { user_id: props.userId })}>
          Accept
        </button>
      </h3>
    </div>
  )
}

export default FollowRequestEntry;