import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import postData from '../../../dummydata.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: 'carol',
      myPosts: false
    }
    this.showMyPosts = this.showMyPosts.bind(this);
  }

  componentDidMount() {
    this.setState({
      posts: postData
    });
  }

  showMyPosts() {
    this.setState({ myPosts: !this.state.myPosts });
  }

  render() {
    return (
      <div>
        <h1>Instagram Clone</h1>
        <Navbar showMyPosts={this.showMyPosts}/>
        <Feed posts={this.state.posts}
              myPosts={this.state.myPosts}
              user={this.state.user}/>
      </div>
    );
  }
}

export default App;