import React, { Component } from 'react';
import Comments from './Comments.jsx';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessages: false
    };
    this.expandMessages = this.expandMessages.bind(this);
  }

  expandMessages() {
    this.setState({displayMessages: !this.state.displayMessages});
  }

  render() {
    return (
      <div>
        <img onClick={this.expandMessages} src={this.props.post.imgSrc} />
        <h5>{this.props.post.username}</h5>
        <Comments comments={this.props.post.comments}
                  displayMessages={this.state.displayMessages}/>
      </div>
    );
  }
};

export default Post;