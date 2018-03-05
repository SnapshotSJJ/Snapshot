import React, { Component } from 'react';
import NotificationsEntry from './NotificationsEntry.jsx';
import $ from 'jquery';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedRequests: []
    }
    this.closeAccepted = this.closeAccepted.bind(this);
  }

  componentDidMount() {
    this.getAcceptedRequests()
  }

  getAcceptedRequests() {
    $.get(`http://127.0.0.1:1337/users/${this.props.userId}/accepted`, (data) => {
      this.setState({
        acceptedRequests: data
      });
    });
  }

  closeAccepted(reqBody) {
    const self = this;

    $.ajax({
      url: `http://127.0.0.1:1337/users/accepted/${this.props.userId}`,
      type: 'PUT',
      data: reqBody,
      success: function(data) {
        console.log(data);
        self.getAcceptedRequests();
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.acceptedRequests.map((notification, index) =>
                                        <NotificationsEntry
                                          name={notification.name}
                                          userId={notification.user_id}
                                          key={index}
                                          closeAccepted={this.closeAccepted}
                                        />)}
      </div>
    )
  }
}

export default Notifications;