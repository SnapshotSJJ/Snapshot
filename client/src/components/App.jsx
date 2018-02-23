import React, {Component} from 'react';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import firebase from 'firebase';
import Feed from './Feed.jsx';
import postData from '../../../dummydata.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: 'carol',
      myPosts: false,
    }
    this.showMyPosts = this.showMyPosts.bind(this);
    this.signOut= this.signOut.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      posts: postData,
    });
  }

	signOut () {
		firebase.auth().signOut();
	}

  showMyPosts() {
    this.setState({ myPosts: !this.state.myPosts });
  }

  render() {
    return (
      <div>
        <h1>Instagram Clone</h1>
        <Login 
        	posts={this.state.posts}
          myPosts={this.state.myPosts}
          user={this.state.user}
          showMyPosts={this.showMyPosts}
          signOut={this.signOut}
        />
      </div>
    );
  }
}

export default App;
