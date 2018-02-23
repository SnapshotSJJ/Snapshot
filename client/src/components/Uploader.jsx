import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import $ from 'jquery';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: [] },
    this.onDrop = this.onDrop.bind(this)
  }
  
  onDrop(files) {
    console.log('this is the file: ', files)
    this.setState( {
      file: files
    })
  }

  submitPost() {
    $.ajax({
      type: "POST",
      url: '/upload',
      data: this.state.file[0],
      success: function() {
        console.log('Uploading ', this.state.file[0])
      }
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} />
        <button>Submit</button>
      </div>
    );
  }
};

export default Uploader;