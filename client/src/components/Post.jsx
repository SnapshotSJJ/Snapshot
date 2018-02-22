import React, { Component } from 'react';
import Comments from './Comments.jsx';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessages: false,
      myComment: ''
    };
    this.expandMessages = this.expandMessages.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  expandMessages() {
    this.setState({displayMessages: !this.state.displayMessages});
  }

  createComment(e) {
    this.setState({ myComment: e.target.value });
  }

  render() {
    return (
      <div>
        <img onClick={this.expandMessages} src={this.props.post.imgSrc} />
        <h5>{this.props.post.username}</h5>
        <Comments comments={this.props.post.comments}
                  displayMessages={this.state.displayMessages}
                  createComment={this.createComment}/>
      </div>
    );
  }
};

export default Post;