import React, { Component } from 'react';
import FollowRequestEntry from './FollowRequestEntry.jsx';
import $ from 'jquery';

class FollowRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followRequests: []
    }
    this.acceptFollowRequest = this.acceptFollowRequest.bind(this);
  }

  componentDidMount() {
    this.getFollowRequests();
  }

  getFollowRequests() {
    $.get(`http://127.0.0.1:1337/users/${this.props.userId}/follows`, (data) => {
      this.setState({
        followRequests: data
      });
    });
  }

  acceptFollowRequest(reqBody) {
    const self = this;

    $.ajax({
      url: `http://127.0.0.1:1337/users/accept/${this.props.userId}`,
      type: 'PUT',
      data: reqBody,
      success: function(data) {
        self.getFollowRequests();
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.followRequests.map((request, index) =>
                                        <FollowRequestEntry
                                          name={request.name}
                                          userId={request.user_id}
                                          key={index}
                                          acceptFollowRequest={this.acceptFollowRequest}
                                        />)}
      </div>
    )
  }
}

export default FollowRequests;