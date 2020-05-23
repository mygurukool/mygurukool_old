import React from "react";
import ModalVideo from "react-modal-video";
import "../scss/modal-video.scss";

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vidLink: props.vidUrl,
      vidId: "",
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.extractVideoIds = this.extractVideoIds.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }

  extractVideoIds() {
    //TODO: function should also extract video channel eg: youtube, youku, etc

    // exctract vid Id
    this.state.vidId = this.state.vidLink.split(/[\/]+/).pop();
    //should the url has "=" before the vid id
    this.state.vidId = this.state.vidId.split(/[\=]+/).pop();
  }

  render() {
    return (
      <div>
        {this.extractVideoIds()}
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={this.state.vidId}
          onClose={() => this.setState({ isOpen: false })}
        />
        <button
          type="button"
          className="btn btn-danger margin-5px"
          onClick={this.openModal}
        >
          <i class="fas fa-video"></i> Im Video, Click me!!
        </button>
      </div>
    );
  }
}
