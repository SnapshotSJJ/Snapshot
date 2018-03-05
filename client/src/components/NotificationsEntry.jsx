import React from 'react';

const NotificationsEntry = (props) => {
  return (
    <div>
      <h3>{props.name}
        <button onClick={props.closeAccepted.bind(null, { follow_id: props.followId })}>
          Close
        </button>
      </h3>
    </div>
  )
}

export default NotificationsEntry;