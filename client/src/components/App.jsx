import React, {Component} from 'react';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
<<<<<<< HEAD
import firebase from 'firebase';
||||||| merged common ancestors
=======
import Feed from './Feed.jsx';
import postData from '../../../dummydata.json';
>>>>>>> Expand and hide messages on click

class App extends Component {
<<<<<<< HEAD
	constructor(props) {
		super(props);
	}

	signOut () {
		firebase.auth().signOut();
	}
||||||| merged common ancestors
  constructor() {
    super();
  }
=======
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.setState({
      posts: postData
    });
  }
>>>>>>> Expand and hide messages on click

  render() {

    return (
      <div>
        <h1>Instagram Clone</h1>
        <Navbar />
<<<<<<< HEAD
        <Login />
||||||| merged common ancestors
=======
        <Feed posts={this.state.posts}/>
>>>>>>> Expand and hide messages on click
      </div>
    );
  }
}

export default App;