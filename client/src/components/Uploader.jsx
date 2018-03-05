import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import $ from 'jquery';
import request from 'superagent';
import firebase from 'firebase';

const CLOUDINARY_UPLOAD_PRESET = 'vfitlscn';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hrla20/auto/upload';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       uploadedFileCloudinaryUrl: '',
       title: '',
    },
    this.onDrop = this.onDrop.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.submitPost = this.submitPost.bind(this)
  }
  
  onDrop(files, rejectedFiles) {
    if(rejectedFiles) {
      console.log('there was an error uploading: ', rejectedFiles)
    }
    
      this.setState( {
        uploadedFile: files[0]
      });

      this.handleImageUpload(files[0]);
    
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, res) => {
      if(err) {
        console.log('there was an error: ', err);
      }
      if(res.body.secure_url !== '') {
        console.log('test');
        this.setState({
          uploadedFileCloudinaryUrl: res.body.secure_url
        });
        console.log('this is the state', this.state);
        // insert user_id, url, title
      }
    })

  }

  submitPost(req, getPosts) {
    console.log('this is the firebase user object name: ', firebase.auth().currentUser.displayName)
    console.log('this is the post info: ', this.state.uploadedFileCloudinaryUrl, this.state.title, firebase.auth().currentUser.uid)
    $.post('http://127.0.0.1:1337/posts/upload/submit', {
      img_src: this.state.uploadedFileCloudinaryUrl,
      like_count: 0,
      title: this.state.title,
      name: firebase.auth().currentUser.displayName
    }, () => {
      console.log(this.state.title, ' successfully stored to database!');
      getPosts();
    })
  }

  updateInput(event) {
    this.setState({
      title: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} multiple={false} />
        <input type='text' value={this.state.title} onChange={this.updateInput} placeholder='Name your post...'  />
        <button onClick={this.submitPost.bind(null, {
          img_src: this.state.uploadedFileCloudinaryUrl,
          like_count: 0,
          title: this.state.title,
          name: firebase.auth().currentUser.displayName}, this.props.getPosts)} >Submit</button>
      </div>
    );
  }
};

export default Uploader;