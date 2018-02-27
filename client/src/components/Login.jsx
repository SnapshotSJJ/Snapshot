import React from 'react';
import { config, uiConfig } from '../firebase/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import Uploader from './Uploader.jsx';
import $ from 'jquery';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      signedIn: false,
      user: '',
      userId: ''
		};
		firebase.initializeApp(config);
		// console.log(uiConfig)
	}	

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(true);
        this.setState({
          signedIn: !!user,
          user: user.displayName
        });
        this.postUser({user: user.displayName});
      } else {
        console.log(false);
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

	render() {
    let uploader;
    if(this.props.toggleUploader) {
      uploader = <Uploader />;
      // this.setState({renderState: !this.state.renderState});
    } else {
      // console.log('this is the toggle uploader inside render: ', this.props)
      uploader = <div></div>;
    }
		if (!this.state.signedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <Navbar showMyPosts={this.props.showMyPosts}
                signOut={this.props.signOut}
                showUploader={this.props.showUploader}
                toggleUploader={this.props.toggleUploader}
                user={this.state.user} />
        {uploader}
        <Feed
          userId={this.state.userId}
          user={this.state.user}
          posts={this.props.posts}
          myPosts={this.props.myPosts}
        />
      </div>
    );
	}
}

export default Login;