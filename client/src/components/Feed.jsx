import React from 'react';
import Post from './Post.jsx';
import $ from 'jquery';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filterUserID: 'hi',
      filterUserInput: '',
    };
    this.filterByUser = this.filterByUser.bind(this);
    this.handleUserFilterInput = this.handleUserFilterInput.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    $.get('http://127.0.0.1:1337/posts/all', (data) => {
      this.setState({
        posts: data
      });
    });
  }

  // Filter by clicking on username button/link
  filterByUser(e) {
    console.log('im gettting called')
    this.setState({ filterUserID: e.target.value });
    console.log(this.state.filterUserID);
  }

  // Filter by entering a username in input field
  filterUsers() {
    
    let userToFilterBy = this.state.filterUserInput;
    let filteredPosts = this.props.posts.filter( (post) => {
      return post.name === userToFilterBy;
    });
    this.setState({ posts: filteredPosts });
    //console.log(this.state.posts)

  }

  handleUserFilterInput(e) {
    this.setState({ filterUserInput: e.target.value });
  }

  render() {
    return (
    <div>
      <h3>Feed</h3>
      <input type="text" value={this.state.filterUserInput} onChange={this.handleUserFilterInput} /> 
      <br />
      <button onClick={this.filterUsers}>Filter</button>
      <br />
      <br />
        {this.state.posts.map((post, index) => {
          if (this.props.myPosts) {
            return this.props.user === post.name ? <Post filter={this.filterByUser} key={index} post={post}/> : null;
          }
          return <Post filter={this.filterByUser} key={index} post={post} />;
      })}
    
    
    
    </div>
  );
  }
}

export default Feed;
