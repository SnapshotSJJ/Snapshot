import React, {Component} from 'react';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import firebase from 'firebase';
import Feed from './Feed.jsx';
import postData from '../../../dummydata.json';
import $ from 'jquery';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      myPosts: false,
      toggleUploader: false,
    }
    this.showMyPosts = this.showMyPosts.bind(this);
    this.signOut= this.signOut.bind(this);
    this.showUploader = this.showUploader.bind(this);
  }

	signOut () {
		firebase.auth().signOut();
	}

  showMyPosts() {
    this.setState({ myPosts: !this.state.myPosts });
  }

  showUploader() {
    this.setState({ toggleUploader: !this.state.toggleUploader });
    console.log('this is the updated state: ', this.state.toggleUploader)
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className="col-lg-6 col-lg-offset-6">
              <div>
                <Login 
                  myPosts={this.state.myPosts}
                  showMyPosts={this.showMyPosts}
                  signOut={this.signOut}
                  toggleUploader={this.state.toggleUploader}
                  showUploader={this.showUploader}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
