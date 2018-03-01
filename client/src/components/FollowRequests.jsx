import React, { Component } from 'react';
import FollowRequestEntry from './FollowRequestEntry.jsx';
import $ from 'jquery';

class FollowRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followRequests: []
    }
  }

  componentDidMount() {
    this.getFollowRequests();
  }

  getFollowRequests() {
    $.get(`http://127.0.0.1:1337/users/${this.props.userId}/follows`, (data) => {
      this.setState({
        followRequests: data
      });
      console.log('success', data);
    });
  }


  render() {
    return (
      <div>
        {this.state.followRequests.map((request, index) =>
                                        <FollowRequestEntry
                                          name={request.name}
                                          followId={request.user_id}
                                          key={index}
                                        />)}
      </div>
    )
  }
}

export default FollowRequests;