import React from "react";
import { Container, Button, CircularProgress } from "@material-ui/core";

class ResultVideo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showButton: false,
      process: "show-result-button",
    };
  }

  handleGetResult = () => {
    this.setState({ process: "count-down" });
    setTimeout(() => {
      this.setState({ process: "result-video" });
    }, 4000);
    setTimeout(() => this.setState({ showButton: true }), 53000);
  };

  renderResult = () => {
    const { process } = this.state;
    switch (process) {
      case "show-result-button":
        return (
          <div
            style={{
              textAlign: "center",
              position: "relative",
              marginTop: "15%",
            }}
          >
            <h3>
              You have completed the test. Click the button below to get your
              results.
            </h3>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={this.handleGetResult}
              style={{
                backgroundColor: "black",
                width: 200,
                marginTop: 10,
              }}
            >
              Get Results
            </Button>
          </div>
        );
      case "count-down":
        return (
          <div
            style={{
              textAlign: "center",
              position: "relative",
              marginTop: "10%",
            }}
          >
            <CircularProgress />
            <br />
            <br />
            <h3>Generating the report, please wait ...</h3>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    const { process } = this.state;
    return (
      <Container style={{ textAlign: "center" }}>
        <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
          {!this.state.showResult ? 8 : 9}
        </h2>
        {this.renderResult()}
        {process === "result-video" ? (
          <div
            style={{
              textAlign: "center",
              position: "relative",
              marginTop: "2%",
            }}
          >
            <h4>
              Your test performance indicates that you may have{" "}
              <span className="text-danger">hearing loss</span>.
            </h4>
            <h4>
              Please view the short clip below for more information on what this
              means.
            </h4>
            <br />
            <video
              width="40%"
              autoPlay={true}
              controls={false}
              src="https://literacyapp.s3.ca-central-1.amazonaws.com/videos/result-video.mp4"
            >
              <h3>This browser does not support the video element.</h3>
            </video>
            <br />
            {this.state.showButton ? (
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={this.props.handleClick}
                style={{
                  backgroundColor: "black",
                  width: 200,
                  height: 50,
                  marginTop: 10,
                }}
              >
                Next
              </Button>
            ) : null}
          </div>
        ) : null}
      </Container>
    );
  }
}

export default ResultVideo;
