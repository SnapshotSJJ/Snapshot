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
      showNotifications: false
		};
    firebase.initializeApp(config);
    this.showFollowsButton = this.showFollowsButton.bind(this);
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

  showNotifications() {
    this.setState({showNotifications: !this.state.showNotifications});
  }

  showFollowsButton() {
    this.setState({showFollows: !this.state.showFollows});
    console.log(this.state.showFollows);
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
        <Routes
          userId={this.state.userId}
          user={this.state.user}
          showFollowsButton={this.showFollowsButton}
          showFollows={this.state.showFollows}
        />
      </div>
    );
	}
}

export default Login;