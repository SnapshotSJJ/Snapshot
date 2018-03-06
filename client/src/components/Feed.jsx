import React from 'react';
import Post from './Post.jsx';
import $ from 'jquery';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterUserID: 'hi',
      filterUserInput: '',
    };
    this.filterByUser = this.filterByUser.bind(this);
    this.handleUserFilterInput = this.handleUserFilterInput.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
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
   
      <br />
      <button onClick={this.filterUsers}>Filter</button>
      <br />
      <br />
        {this.props.posts.map((post, index) => {
          if (this.props.myPosts) {
            return this.props.user === post.name ? <Post filter={this.filterByUser} key={index} post={post} userId={this.props.userId} getPosts={this.props.getPosts}/> : null;
          }
          return <Post filter={this.filterByUser} key={index} post={post} userId={this.props.userId} getPosts={this.props.getPosts}/>;
      })}
    </div>
  );
  }
}

export default Feed;
