import React, {Component} from 'react';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import firebase from 'firebase';
import Feed from './Feed.jsx';
import postData from '../../../dummydata.json';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: 'carol',
      myPosts: false,
      toggleUploader: false,
    }
    this.showMyPosts = this.showMyPosts.bind(this);
    this.signOut= this.signOut.bind(this);
    this.showUploader = this.showUploader.bind(this);
  }
  
  componentDidMount() {
    this.getPosts();
  }

	signOut () {
		firebase.auth().signOut();
	}

  getPosts() {
    $.get('http://127.0.0.1:1337/posts/all', (data) => {
      this.setState({
        posts: data
      });
    });
  }

  showMyPosts() {
    this.setState({ myPosts: !this.state.myPosts });
  }

  showUploader() {
    this.setState({ toggleUploader: !this.state.toggleUploader });
    console.log('this is the updated state: ', this.state.toggleUploader)
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
          toggleUploader={this.state.toggleUploader}
          showUploader={this.showUploader}
        />
      </div>
    );
  }
}

export default App;
