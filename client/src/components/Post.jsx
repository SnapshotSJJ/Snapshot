import React, { Component } from 'react';
import Comments from './Comments.jsx';
import $ from 'jquery';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessages: false,
      myComment: '',
      comments: []
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
  }

  render() {
    return (
      <div>
        <img onClick={this.expandMessages} src={this.props.post.img_src} />
        <h5>{this.props.post.name}</h5>
        <Comments comments={this.state.comments}
                  displayMessages={this.state.displayMessages}
                  createComment={this.createComment}/>
      </div>
    );
  }
};

export default Post;