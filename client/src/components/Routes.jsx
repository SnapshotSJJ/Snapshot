import React, {Component} from 'react';
import Feed from './Feed.jsx';
import FollowRequests from './FollowRequests.jsx';
import Notification from './Notifications.jsx';
import $ from 'jquery';

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPosts();
  }
  
  render() {
    if (this.props.showFollows) {
      return (
        <div>
          <FollowRequests userId={this.props.userId} />
        </div>
      );
    } else if (this.props.showNotifications) {
      return (
        <div>
          <Notification userId={this.props.userId} />
        </div>
      );
    }
    return (
      <div>
        <Feed posts={this.props.posts} getPosts={this.props.getPosts} userId={this.props.userId} />
      </div>
    );
  }
}

export default Routes;
