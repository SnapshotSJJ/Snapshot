import React, {Component} from 'react';
import Login from './Login.jsx';
import firebase from 'firebase';

class App extends Component {
	constructor(props) {
		super(props);
	}

	signOut () {
		firebase.auth().signOut();
	}
	
  render() {

    return (
      <div>
        <h1>Hello World!</h1>
        <Login />
        
      </div>
    );
  }
}

export default App;