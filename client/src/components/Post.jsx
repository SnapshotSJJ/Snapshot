import React, { Component } from 'react';
import Comments from './Comments.jsx';
import $ from 'jquery';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessages: false,
      myComment: '',
      comments: [],
      likes: 0,
    };
    this.expandMessages = this.expandMessages.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  expandMessages() {
    this.setState({displayMessages: !this.state.displayMessages});
    this.getComments();
  }

  getComments() {
    $.get(`http://127.0.0.1:1337/posts/comments/${this.props.post.id}`, (data) => {
      this.setState({
        comments: data
      });
    });
  }

  createComment(e) {
    this.setState({ myComment: e.target.value });
    $.post(`http://127.0.0.1:1337/posts/comment/${this.props.post.id}`)
  }

  followUser(reqBody) {
    $.ajax({
      url: `http://127.0.0.1:1337/users/follow/${reqBody.user_id}`,
      type: 'PUT',
      data: reqBody,
      success: function(data) {
        console.log(data);
      }
    });
  }

  likePost(reqBody, getPosts) {
    $.ajax({
      url: `http://127.0.0.1:1337/posts/like/${reqBody.post_id}`,
      type: 'PUT',
      data: reqBody,
      success: function(data) {
        console.log(data);
        getPosts();
      }
    });
  }

  render() {
    return (
      <div>
        <iframe scrolling='no' src={this.props.post.img_src} />
        <br />
        <button onClick={this.expandMessages} >Comments </button>
        {
          Number(this.props.userId) !== this.props.post.user_id ?
          <h5 onClick={this.props.filterByUser}>{this.props.post.name}
            {/* Follow button */}
            <button onClick={this.followUser.bind(null, {user_id: this.props.userId, follow_id: this.props.post.user_id})}>
              Follow
            </button>
            {/* Like button */}
            <button onClick={this.likePost.bind(null, {user_id: this.props.userId, post_id: this.props.post.id}, this.props.getPosts)}>
              Like
            </button>
          </h5> :
          <h5>{this.props.post.name}</h5>
        }
        <p>Likes: {this.props.post.like_count}</p>
        <Comments comments={this.state.comments}
                  displayMessages={this.state.displayMessages}
                  createComment={this.createComment}/>
      </div>
    );
  }
};

export default Post;