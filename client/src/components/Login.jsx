import React from 'react';
import { config, uiConfig } from '../firebase/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

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
      </div>
    );
	}
}

export default Login;