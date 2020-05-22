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
      exerciseFileName: props.exerciesDetails.filename,
      exerciseFileLink: props.exerciesDetails.filelink,
      exerciseFileObject: props.exerciesDetails.fileObject,
      exerciseFileType: props.exerciesDetails.filetype,
      fileUploadedName: "",
      groupId: props.groupData,
      subjectName: props.subjectName,
      title: props.title,
      studentDetails: props.studentDetails,
      fileName: "",
      exerciseFiles: "",
      fetchedFileURL: "",
      toDownloadFile: true,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.fetchFile = this.fetchFile.bind(this);
    this.displayFile = this.displayFile.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_GRAPH_API_URL +
          `sites/${this.state.groupId}/drives`,
        {
          params: {},
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((driveRes) => {
        axios
          .get(
            process.env.REACT_APP_GRAPH_API_URL +
              `sites/${this.state.groupId}/drive/root/search(q='{${this.state.title}}')`,
            {
              params: {},
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            // console.log(process.env.REACT_APP_GRAPH_API_URL+`sites/${this.state.groupId}/drives/${driveRes.data.value[0].id}/items/${res.data.value[0].id}/children`);
            if (res.data.value[0]) {
              axios
                .get(
                  process.env.REACT_APP_GRAPH_API_URL +
                    `sites/root/drives/${driveRes.data.value[0].id}/items/${res.data.value[0].id}/children`,
                  {
                    // 'https://graph.microsoft.com/v1.0/sites/mygurukool.sharepoint.com,7c9fc398-a705-4e32-8b92-1c55f6536ca5,960408e8-1290-401d-bb0e-e80861e1e003/drives/b!mMOffAWnMk6LkhxV9lNspegIBJaQEh1Auw7oCGHh4AN3wsxO31WBSJXjoo9fcf91/items/01RYMJ7Z6LKU4S3RYOL5C22SQRAF2SC7MV/children',
                    params: {},
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((fileRes) => {
                  this.setState({ exerciseFiles: fileRes.data });
                  console.log(fileRes.data);
                });
            }
          });
      });
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

  handleUploadClick = (event) => {
    this.setState({
      hideFileUpload: false,
    });
  };

  displayFile() {
    // const toDownloadFile = true;
    if (this.state.exerciseFileLink) {
      this.state.fetchedFileURL = this.state.exerciseFileLink;
    } else if (this.state.exerciseFileObject) {
      this.fetchFile(this.state.exerciseFileObject);
    } else {
      this.state.toDownloadFile = false;
    }
    return (
      <Fragment>
        <td>
          {this.state.toDownloadFile ? (
            <a href={this.state.fetchedFileURL} target="_blank">
              <i class="fas fa-eye fa-2x"></i>
            </a>
          ) : (
            ""
          )}
        </td>
        <td>
          {this.state.toDownloadFile ? (
            <a
              href={this.state.fetchedFileURL}
              target="_blank"
              //onClick={this.downloadPDF()}
            >
              <i class="fas fa-download fa-2x"></i>
            </a>
          ) : (
            ""
          )}
          {/* {this.state.exerciseFileObject ? (
            <a
              href="#?"
              className="btn btn-primary"
              id={this.state.exerciseFileObject}
              onClick={this.fetchFile}
            >
              <i class="fas fa-download fa-2x"></i>
            </a>
          ) : (
            ""
          )} */}
        </td>
      </Fragment>
    );
  }

  downloadPDF() {
    alert("download file");
    const link = document.createElement("a");
    link.href = this.state.fetchedFileURL;
    link.setAttribute("download", this.state.exerciseFileName); //or any other extension
    document.body.appendChild(link);
    link.click();
  }

  fetchFile(targetId) {
    axios
      .get(targetId, {
        params: {},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: this.state.exerciseFileType,
        },
        responseType: "blob", // important
      })
      .then((response) => {
        this.state.fetchedFileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
      });
  }

  handleClick = (event) => {
    const formData = new FormData();
    // this.file = this.state.studentDetails.id+"_"+this.file.name;
    // alert(this.file);
    // return false;
    formData.append(this.file.name, this.file);
    axios
      .get(
        process.env.REACT_APP_GRAPH_API_URL +
          `sites/${this.state.groupId}/drives`,
        {
          params: {},
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((driveRes) => {
        // console.log(driveRes.data);
        axios
          .get(
            process.env.REACT_APP_GRAPH_API_URL +
              `sites/${this.state.groupId}/drive/root/search(q='{${this.state.title}}')`,
            {
              params: {},
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            // console.log(res.data)
            // console.log(process.env.REACT_APP_GRAPH_API_URL+"sites/"+process.env.REACT_APP_SHARE_POINT_URL+`/drives/${driveRes.data.value[0].id}/items/${res.data.value[0].id}:/${this.file.name}:/content`);
            // return false;

            axios
              .put(
                process.env.REACT_APP_GRAPH_API_URL +
                  "sites/" +
                  process.env.REACT_APP_SHARE_POINT_URL +
                  `/drives/${driveRes.data.value[0].id}/items/${
                    res.data.value[0].id
                  }:/${
                    this.state.studentDetails.displayName.replace(" ", "_") +
                    "_" +
                    this.file.name
                  }:/content`,
                // `https://graph.microsoft.com/v1.0/sites/mygurukool.sharepoint.com/drives/b!mMOffAWnMk6LkhxV9lNspegIBJaQEh1Auw7oCGHh4AN3wsxO31WBSJXjoo9fcf91/items/01RYMJ7Z4Y4ILBEY3CBVF3WAF26DLAFX7M:/${this.file.name}:/content`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/octet-stream",
                  },
                }
              )
              .then((response) => {
                // console.log(response.data.@microsoft.graph.downloadUr);
                this.setState({ fileUploadedName: response.data });
                this.setState({ fileName: this.file.name });
                this.fileUploaded = true;
              })
              .catch((error) => {
                console.log(error);
              });
            this.setState({
              hideFileUpload: true,
            });
          });
      });
  };

  render() {
    return (
      <Fragment>
        <table class="col-12">
          <tr className="testing-color-purple col-12">
            <td className="filelink">
              {this.state.exerciseFileName ? this.state.exerciseFileName : ""}
            </td>
            <td>{this.displayFile()}</td>
            <td class="float-right">
              <a
                href="#?"
                onClick={this.handleUploadClick}
                className="btn btn-primary"
              >
                <i class="fas fa-upload"></i> Upload Exercise
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              {this.state.fileUploadedName
                ? this.state.fileName.toUpperCase()
                : ""}
            </td>
            <td colspan="2">
              {this.state.fileUploadedName ? (
                <a href={this.state.fileUploadedName.webUrl} target="_blank">
                  <i class="fas fa-eye fa-2x"></i>
                </a>
              ) : (
                ""
              )}
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
                  <i class="fas fa-cloud-upload-alt"></i> Submit
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <table className="table table-stripped">
            {this.state.exerciseFiles &&
              this.state.exerciseFiles.value.map((exe, i) => (
                <tr>
                  <td colspan="2">
                    {exe.name
                      .replace(
                        this.state.studentDetails.displayName.replace(
                          " ",
                          "_"
                        ) + "_",
                        ""
                      )
                      .toUpperCase()}
                  </td>
                  <td colspan="2">
                    <a href={exe.webUrl} target="_blank">
                      <i class="fas fa-eye fa-2x"></i>
                    </a>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </Fragment>
    );
  }
}
