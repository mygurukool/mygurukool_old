import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      file: "",
      fileUploaded: '',
      hideFileUpload:false,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0];
    this.setState({
      file: this.file.name
    });
    document.getElementById("choose_text").innerHTML = this.file.name.toUpperCase();
  };

  cancelClick = (event) => {
    this.setState({
      hideFileUpload : true
    })
  };

  handleClick = (event) => {
    const formData = new FormData();
    formData.append(this.file.name, this.file);
    axios
      .put(
        `https://graph.microsoft.com/v1.0/sites/mygurukool.sharepoint.com/drives/b!mMOffAWnMk6LkhxV9lNspegIBJaQEh1Auw7oCGHh4AN3wsxO31WBSJXjoo9fcf91/items/01RYMJ7Z4Y4ILBEY3CBVF3WAF26DLAFX7M:/${this.file.name}:/content`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/octet-stream",
          },
        }
      )
      .then((response) => {
        console.log(response.statusText);
        this.fileUploaded = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    
    return (
      <Fragment>
        {
          this.state.hideFileUpload == false
          ?
          <div class="card card-body fileblock">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="customFile"
                onChange={this.handleFileChange}
              />
              <label id="choose_text" className="custom-file-label">Choose file</label>
          
            </div>
            <div className="form-group">
            <br/>
              <button type="reset" onClick={this.cancelClick} className="btn btn-secondary">Cancel</button> <button type="button" className="btn btn-success" onClick={this.handleClick}>Upload</button>
            </div>
            { 
              this.state.file ? this.state.file : '' 
            }
          </div>
          : 
          ''
        }

        {/* <input
          type="file"
          class="custom-file-input"
          id="customFile"
          onChange={this.handleFileChange}
        />
        <label className="custom-file-label">Choose file</label>
        {this.state.file ? this.state.file : ""}
        <button type="button">Cancel</button>
        <button type="button">Upload</button> */}
      </Fragment>
    );
  }
}
