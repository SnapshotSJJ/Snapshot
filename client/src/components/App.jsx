import React, {Component} from 'react';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import firebase from 'firebase';
import Feed from './Feed.jsx';
import postData from '../../../dummydata.json';
import $ from 'jquery';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      toggleUploader: false,
    }
    this.signOut= this.signOut.bind(this);
    this.showUploader = this.showUploader.bind(this);
  }

	signOut () {
		firebase.auth().signOut();
	}

  showUploader() {
    this.setState({ toggleUploader: !this.state.toggleUploader });
    console.log('this is the updated state: ', this.state.toggleUploader)
  }

  render() {
    return (
      <div >
        <div>
          <Login 
            signOut={this.signOut}
            toggleUploader={this.state.toggleUploader}
            showUploader={this.showUploader}
          />
        </div>
      </div>
    );
  }
}

export default App;
