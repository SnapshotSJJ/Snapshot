import React from 'react';
import Uploader from './Uploader.jsx';


const Navbar = (props) => {

  return (
    <div>
      <button onClick={props.showFolloweesPostsButton.bind(null, {userId: props.userId})}>People I Follow</button>
      <button onClick={props.showUploader} >Make Post</button>
      <button onClick={props.showFollowsButton}>Follow Requests</button>
      <button onClick={props.showNotificationsButton}>Notifications</button>
      <button onClick={props.signOut}>Logout</button>
    </div>
  );
};

export default Navbar;
