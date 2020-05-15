import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import FileUpload from "./FileUpload";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/HashLoader";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import ModalVideo from "react-modal-video";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-free/css/all.css";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import stripHtml from "string-strip-html";
// import parse from 'html-react-parser';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const cb = ({
  tag,
  deleteFrom,
  deleteTo,
  insert,
  rangesArr,
  proposedReturn,
}) => {
  // default action which does nothing different from normal, non-callback operation
  rangesArr.push(deleteFrom, deleteTo, insert);
  // you might want to do something different, depending on "tag" contents.
};
export default class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentData: null,
      displayName: "",
      sections: "",
      tabIndex: 0,
      exercise: "",
      exercisedata: "",
      isLoading: false,
      formUpload: "",
      currentView: "",
      isOpen: false,
      vidId: "",
      exerciseTitle: "",
    };

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.buildVideoComponent = this.buildVideoComponent.bind(this);
    this.axiosCall = this.axiosCall.bind(this);
  }
  componentDidMount() {
    if (
      "match" in this.props &&
      "params" in this.props.match &&
      "token" in this.props.match.params
    ) {
      localStorage.setItem("token", this.props.match.params.token);
    }
    this.state.isLoading = true;

    this.axiosCall(
      "https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/1-9e7210a1-77c7-4b10-8a1b-ab0fb4a9f4dd/sectionGroups"
    ).then((response) => {
      this.setState({ studentData: response.data });
      this.setState({
        displayName: this.state.studentData.value[0].displayName,
      });
      localStorage.setItem(
        "studentName",
        this.state.studentData.value[0].displayName
      );
      this.axiosCall(
        `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/${this.state.studentData.value[0].id}/sections`
      ).then((response) => {
        this.state.isLoading = false;
        this.setState({ sections: response.data });
        {
          this.axiosCall(
            `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${this.state.sections.value[0].id}/pages`
          ).then((response) => {
            this.setState({ exercise: response.data });
            // console.log(this.state.exercise);
            this.setState({ exercisedata: this.state.exercise });
          });
        }
      });
    });
  }

  axiosCall(url) {
    return axios.get(url, {
      params: {},
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  buildVideoComponent(componentId, vidLink) {
    //TODO: function should also extract video channel eg: youtube, youku, etc

    //exctract vid Id
    this.state.vidId = vidLink.split(/[\/]+/).pop();
    //should the url has "=" before the vid id
    this.state.vidId = vidLink.split(/[\=]+/).pop();

    return (
      <div id={componentId}>
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={this.state.vidId}
          onClose={() => this.setState({ isOpen: false })}
        />
        <button onClick={this.openModal}>
          <i class="fas fa-video"></i> Explanation Video
        </button>
      </div>
    );
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  handleSubmitClick = (event) => {
    this.setState({ formUpload: <FileUpload status_open="false" /> });
  };

  handleClick = (event) => {
    this.setState({ currentView: event.target.text });
    this.state.isLoading = true;
    this.axiosCall(
      `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${event.target.id}/pages`
    ).then((response) => {
      this.state.isLoading = false;
      this.setState({ exercise: response.data });
      {
        this.state.exercise &&
          this.state.exercise.value.map((exe, i) =>
            this.axiosCall(exe.contentUrl).then((response) => {
              axios
                .post("http://localhost/mygurukool.php", {
                  data: response.data,
                })
                .then((res) => {
                  this.state.exercise.value[i].content = res.data;
                  this.setState({ exercisedata: this.state.exercise });
                  console.log(this.state.exercisedata);
                });
            })
          );
      }
    });
    return false;
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-primary" role="alert">
                <span className="badge badge-light">
                  {this.state.displayName}
                </span>
                <ul className="navbar-nav float-right">
                  <li className="nav-item">
                    <i className="far fa-comments"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row sub-excer-section">
              <div className="col-12">
                <ul
                  className="nav nav-pills mb-3 sub-nav"
                  id="pills-tab"
                  role="tablist"
                >
                  {this.state.sections &&
                    this.state.sections.value.map((key, i) => (
                      <li className="nav-item">
                        <a
                          className={
                            this.state.currentView == key.displayName
                              ? "active nav-link"
                              : "nav-link"
                          }
                          id={key.id}
                          data-toggle="pill"
                          href="#?"
                          onClick={this.handleClick}
                        >
                          {key.displayName}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="tabcontent col-12">
            <ClipLoader
              css={override}
              size={30}
              color={"#D77F36"}
              loading={this.state.isLoading}
            />

            <Accordion>
              {this.state.exercisedata &&
                this.state.exercisedata.value.map((exe, i) => (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <div className="row">
                          <div className="float-left col-12">
                            {exe.title
                              ? (this.state.exerciseTitle = exe.title)
                              : "No Exercise Data"}
                            <small class="text-muted float-right">
                              {exe.content && exe.content.submissionDate
                                ? exe.content.submissionDate
                                : ""}
                            </small>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <button
                              type="button"
                              className="btn btn-submit turnin"
                            >
                              <i class="fas fa-check"></i> Turn In
                            </button>
                          </div>
                          <div className="card-header col-12">
                            <ul
                              dangerouslySetInnerHTML={{
                                __html: exe.content
                                  ? exe.content.instructions
                                  : "",
                              }}
                            ></ul>
                          </div>
                          <table class="table">
                            <tr className="teacher-excer col-12">
                              <td className="pdflink">
                                {exe.content && exe.content.pdfname
                                  ? exe.content.pdfname
                                  : ""}
                              </td>
                              <td>
                                {exe.content && exe.content.pdflink ? (
                                  <a href={exe.content.pdflink} target="_blank">
                                    <i class="fas fa-eye"></i>
                                  </a>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>
                                {exe.content && exe.content.pdflink ? (
                                  <a href={exe.content.pdflink} target="_blank">
                                    <i class="fas fa-download"></i>
                                  </a>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>
                                <a
                                  href="#?"
                                  onClick={this.handleSubmitClick}
                                  className="btn btn-primary"
                                >
                                  Submit
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="3">{this.state.formUpload}</td>
                            </tr>
                          </table>
                          {exe.content && exe.content.youtubelink
                            ? this.buildVideoComponent(
                                this.state.exerciseTitle + "_vid",
                                exe.content.youtubelink
                              )
                            : ""}
                        </div>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
      </Fragment>
    );
  }
}
