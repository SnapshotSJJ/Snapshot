import React from 'react';
import { config, uiConfig } from '../firebase/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import Uploader from './Uploader.jsx';
import FollowRequests from './FollowRequests.jsx';
import $ from 'jquery';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      signedIn: false,
      user: '',
      userId: '',
      showFollows: false
		};
    firebase.initializeApp(config);
    this.showFollowsButton = this.showFollowsButton.bind(this);
    this.getPosts = this.getPosts.bind(this);
	}	

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          signedIn: !!user,
          user: user.displayName
        });
        this.postUser({user: user.displayName});
      } else {
        this.setState({
          signedIn: false,
          user: '',
          userId: ''
        });
      }
    });
	}

  showFollowsButton() {
    this.setState({showFollows: !this.state.showFollows});
  }

  postUser(reqBody) {
    $.post(`http://127.0.0.1:1337/users`, reqBody, (data) => {
      this.setState({
        userId: data
      });
    });
  }

  getPosts() {
    $.get('http://127.0.0.1:1337/posts/all', (data) => {
      this.setState({
        posts: data
      });
    });
  }

	render() {
    let uploader;
    if(this.props.toggleUploader) {
      uploader = <Uploader />;
    } else {
      uploader = <div></div>;
    }
		if (!this.state.signedIn) {
      return (
        <div>
          <h1 class="text-center">Sign In</h1>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <Navbar 
          showMyPosts={this.props.showMyPosts}
          signOut={this.props.signOut}
          showUploader={this.props.showUploader}
          toggleUploader={this.props.toggleUploader}
          user={this.state.user}
          showFollowsButton={this.showFollowsButton}
        />
        {uploader}
        {
          this.state.showFollows ? <FollowRequests userId={this.state.userId}/> :
            <Feed
              userId={this.state.userId}
              user={this.state.user}
              posts={this.props.posts}
              myPosts={this.props.myPosts}
              getPosts={this.getPosts}
            />
        }
      </div>
    );
	}
}

export default Login;