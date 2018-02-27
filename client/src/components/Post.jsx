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



  render() {
    return (
      <div>
        <img onClick={this.expandMessages} src={this.props.post.img_src} />
        <h5> <button value="hi" href="#" onClick={this.props.filterByUser}>{this.props.post.name}</button></h5>
        <Comments comments={this.state.comments}
                  displayMessages={this.state.displayMessages}
                  createComment={this.createComment}/>
      </div>
    );
  }
};

export default Post;