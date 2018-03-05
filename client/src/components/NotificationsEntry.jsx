import React from 'react';

const NotificationsEntry = (props) => {
  return (
    <div>
      <h3>{props.name}
        <button onClick={props.closeAccepted.bind(null, { user_id: props.userId })}>
          Close
        </button>
      </h3>
    </div>
  )
}

export default NotificationsEntry;