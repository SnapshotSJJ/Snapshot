import React from 'react';
import { config, uiConfig } from '../firebase/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Navbar from './Navbar.jsx';
import Uploader from './Uploader.jsx';
import Routes from './Routes.jsx';
import $ from 'jquery';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      signedIn: false,
      user: '',
      userId: '',
      showFollows: false,
      showNotifications: false,

      showFolloweesPosts: false,
      followeesPosts: [],
      posts: []
		};
    firebase.initializeApp(config);
    this.getPosts = this.getPosts.bind(this);
    this.showFollowsButton = this.showFollowsButton.bind(this);
    this.showNotificationsButton = this.showNotificationsButton.bind(this);
    this.showFolloweesPostsButton = this.showFolloweesPostsButton.bind(this);
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

  postUser(reqBody) {
    $.post(`http://127.0.0.1:1337/users`, reqBody, (data) => {
      this.setState({
        userId: data
      });
    });
  }

  showNotificationsButton() {
    this.setState({
      showNotifications: !this.state.showNotifications,
      showFollows: false,
      showFolloweesPosts: false
    });
  }

  showFollowsButton() {
    this.setState({
      showFollows: !this.state.showFollows,
      showNotifications: false,
      showFolloweesPosts: false
    });
  }

  showFolloweesPostsButton() {
    this.setState({
      showFolloweesPosts: !this.state.showFolloweesPosts,
      showFollows: false,
      showNotifications: false
    });
    $.get(`http://127.0.0.1:1337/posts/followees/${this.state.userId}`,  (data) => {
      this.setState({
        followeesPosts: data
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
      uploader = <Uploader getPosts={this.getPosts} />;
    } else {
      uploader = <div></div>;
    }
		if (!this.state.signedIn) {
      return (
        <div>
          <h1 className="text-center title">Sign In</h1>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <Navbar 
          signOut={this.props.signOut}
          showUploader={this.props.showUploader}
          toggleUploader={this.props.toggleUploader}
          user={this.state.user}
          showFollowsButton={this.showFollowsButton}
          showNotificationsButton={this.showNotificationsButton}
          showFolloweesPostsButton={this.showFolloweesPostsButton}
        />
        {uploader}
        <Routes
          userId={this.state.userId}
          user={this.state.user}
          showFollows={this.state.showFollows}
          showNotifications={this.state.showNotifications}
          showFolloweesPosts={this.state.showFolloweesPosts}
          followeesPosts={this.state.followeesPosts}
          getPosts={this.getPosts}
          posts={this.state.posts}
        />
      </div>
    );
	}
}

export default Login;