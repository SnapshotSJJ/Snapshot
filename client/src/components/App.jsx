import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import postData from '../../../dummydata.json';

class App extends Component {
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

  render() {
    return (
      <div>
        <h1>Instagram Clone</h1>
        <Navbar />
        <Feed posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;