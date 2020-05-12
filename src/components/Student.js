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
    };

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  componentDidMount() {
    if (
      "match" in this.props &&
      "params" in this.props.match &&
      "token" in this.props.match.params
    ) {
      // console.log(this.props.match.params.token);
      localStorage.setItem("token", this.props.match.params.token);
    }
    this.state.isLoading = true;

    // axios.defaults.headers.common['Authorization'] = "Bearer " +localStorage.getItem('userDetails');
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userDetails")}`,
      },
    };

    const bodyParameters = {};

    axios
      .get(
        "https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/1-9e7210a1-77c7-4b10-8a1b-ab0fb4a9f4dd/sectionGroups",
        {
          params: {},
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        this.setState({ studentData: response.data });
        this.setState({
          displayName: this.state.studentData.value[0].displayName,
        });
        axios
          .get(
            `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/${this.state.studentData.value[0].id}/sections`,
            {
              params: {},
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            this.state.isLoading = false;
            this.setState({ sections: response.data });
            {
              axios
                .get(
                  `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${this.state.sections.value[0].id}/pages`,
                  {
                    params: {},
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((response) => {
                  this.setState({ exercise: response.data });
                  console.log(this.state.exercise);
                  this.setState({ exercisedata: this.state.exercise });
                });
            }
          });
      });
  }

  handleSubmitClick = (event) => {
    this.setState({ formUpload: <FileUpload /> });
  };

  handleClick = (event) => {
    this.state.isLoading = true;
    // alert(event.target.id);
    axios
      .get(
        `https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${event.target.id}/pages`,

        {
          params: {},
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        this.state.isLoading = false;
        this.setState({ exercise: response.data });
        {
          this.state.exercise &&
            this.state.exercise.value.map((exe, i) =>
              // console.log(exe.contentUrl)
              axios
                .get(exe.contentUrl, {
                  params: {},
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                })
                .then((response) => {
                  axios
                    .post("http://localhost/mygurukool.php", {
                      data: response.data,
                      // password: this.state.password,
                    })
                    .then((res) => {
                      this.state.exercise.value[i].content = res.data;
                      console.log(
                        this.state.exercise.value[i].content.instructions
                      );
                      this.setState({ exercisedata: this.state.exercise });
                    });
                  // 		this.state.exercise.value[i].content = response.data;

                  //

                  // 		// console.log(stripHtml(this.state.exercise.value[i].content));
                  // 		// parse(this.state.exercise.value[i].content, {
                  // 		//   replace: function(domNode) {
                  // 		//     // console.log(domNode, { depth: null });
                  // 		//     c
                  // 		//   }
                  // 		// });
                  // 		console.log(stripHtml(this.state.exercise.value[i].content, {cb} ));
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
                          className="nav-link active"
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
            <i class="fas fa-download"></i>
            <Accordion>
              {this.state.exercisedata &&
                this.state.exercisedata.value.map((exe, i) => (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        {exe.title ? exe.title : "No Exercise Data"}
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
                                    <i class="fas fa-download"></i> Download
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
                              <td colspan="3">
                                <div class="card card-body">
                                  <div class="custom-file">
                                    {this.state.formUpload}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
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
