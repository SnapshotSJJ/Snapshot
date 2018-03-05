import React from 'react';
import Uploader from './Uploader.jsx';


const Navbar = (props) => {

  return (
    <div>
      <strong onClick={props.showMyPosts}>My Posts</strong> |
      <button onClick={props.showUploader} >Make Post</button> |
      <strong onClick={props.showFollowsButton}>Follow Requests</strong> |
      <strong>Notifications</strong> |
      <strong>Logout</strong>

      <button onClick={props.signOut}>sign-out</button>
    </div>
  );
};

export default Navbar;
