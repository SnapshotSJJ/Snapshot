import React from 'react';
import { config, uiConfig } from '../firebase/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import Uploader from './Uploader.jsx';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      signedIn: false,
		};
		firebase.initializeApp(config);
		console.log(uiConfig)
	}	

	componentDidMount() {
		firebase.auth().onAuthStateChanged(
			(user) => this.setState({ signedIn: !!user })
		);
	}

	render() {
    let uploader;
    if(this.props.toggleUploader) {
      uploader = <Uploader />;
      // this.setState({renderState: !this.state.renderState});
    } else {
      console.log('this is the toggle uploader inside render: ', this.props)
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
        <Navbar showMyPosts={this.props.showMyPosts} signOut={this.props.signOut} showUploader={this.props.showUploader} toggleUploader={this.props.toggleUploader} />
        {uploader}
        <Feed
          posts={this.props.posts}
          myPosts={this.props.myPosts}
          user={this.props.user}
        />
      </div>
    );
	}
}

export default Login;