import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      fileUploaded: "",
      hideFileUpload: true,
      exercisePdfName: props.exerciesDetails.pdfname,
      exercisePdfLink: props.exerciesDetails.pdflink,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0];
    this.setState({
      file: this.file.name,
    });
    document.getElementById(
      "choose_text"
    ).innerHTML = this.file.name.toUpperCase();
  };

  cancelClick = (event) => {
    this.setState({
      hideFileUpload: true,
    });
  };

  handleSubmitClick = (event) => {
    this.setState({
      hideFileUpload: false,
    });
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
    this.setState({
      hideFileUpload: true,
    });
  };

  render() {
    return (
      <Fragment>
        <table class="col-12">
          <tr className="teacher-excer col-12">
            <td className="pdflink">
              {this.state.exercisePdfName ? this.state.exercisePdfName : ""}
            </td>
            <td>
              {this.state.exercisePdfLink ? (
                <a href={this.state.exercisePdfLink} target="_blank">
                  <i class="fas fa-eye fa-2x"></i>
                </a>
              ) : (
                ""
              )}
            </td>
            <td>
              {this.state.exercisePdfLink ? (
                <a href={this.state.exercisePdfLink} target="_blank">
                  <i class="fas fa-download fa-2x"></i>
                </a>
              ) : (
                ""
              )}
            </td>
            <td class="float-right">
              <a
                href="#?"
                onClick={this.handleSubmitClick}
                className="btn btn-primary"
              >
                <i class="fas fa-upload"></i> Submit
              </a>
            </td>
          </tr>
        </table>
        <div>
          {this.state.hideFileUpload == false ? (
            <div class="card card-body fileblock col-12">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="customFile"
                  onChange={this.handleFileChange}
                />
                <label id="choose_text" className="custom-file-label">
                  Choose file
                </label>
              </div>
              <div className="form-group">
                <br />
                <button
                  type="reset"
                  onClick={this.cancelClick}
                  className="btn btn-danger"
                >
                  <i class="far fa-times-circle"></i> Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleClick}
                >
                  <i class="fas fa-cloud-upload-alt"></i> Upload
                </button>
              </div>
              {this.state.file ? this.state.file : ""}
            </div>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}
