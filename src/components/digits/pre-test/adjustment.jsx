import React from "react";
import { Button, Container, Select, MenuItem } from "@material-ui/core";
import VolumeSlider from "../../../assets/digits/volume-slider";

class VolumeAdjustment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio(process.env.PUBLIC_URL + "/functional-audio/adjust.wav"),
      audioPlay: false,
      volume: 0,
      output: null
    };
  }
  componentDidMount = () => {
    const { audio, volume } = this.state;
    audio.volume = volume / 100;
  };

  componentDidUpdate = () => {
    const { audio, volume } = this.state;
    audio.volume = volume / 100;
  };

  handlePlay = async () => {
    const { audio } = this.state;
    await audio.play();
    this.setState({ audioPlay: true });
  };

  handleStop = async () => {
    const { audio } = this.state;
    await audio.pause();
    this.setState({ audioPlay: false });
  };

  handleNext = () => {
    const { volume, output } = this.state;
    this.state.audio.pause();
    this.props.handleClick(volume, output);
  };

  handleChangeOutput = (e) => {
    this.setState({ output: e.target.value });
  }

  renderNextButton = () => {
    const { volume, output } = this.state;
    if (volume !== 0 && output !== null) {
      return <Button
        variant="contained"
        color="primary"
        style={{ margin: 5, width: 150, backgroundColor: "black" }}
        onClick={this.handleNext}
      >
        Next
      </Button>
    } else {
      return (
          <Button
            variant="contained"
            color="primary"
            disabled
            style={{ margin: 5, width: 150 }}
          >
            Next
          </Button>
      )
    }
  }

  render() {
    const { audioPlay, output } = this.state;
    return (
      <Container>
        <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
          5
        </h2>
        <div
          style={{
            marginTop: "5%",
            marginTop: "5%",
          }}
        >
          <Container>
            <div id="source">
              <h5>You can use either speakers or headphones to complete this experiment. Headphones will work best. </h5>
              <h5>Using the dropbox below, select what you will be using to complete this experiment.</h5>
              {
                output === "speakers" ?
                <h5>(If using speakers, please keep a consistent distance from your computer during the entire
                  experiment)</h5> : null
              }
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={output}
                onChange={this.handleChangeOutput}
                style={{ width: 150 }}
              >
                <MenuItem value="headphones">headphones</MenuItem>
                <MenuItem value="speakers">speakers</MenuItem>
              </Select>
            </div>
            <br />
            <br />
            <div>
              <h4>
                Set your device's volume to the 50%. Click PLAY to listen to an
                audio sample.
              </h4>
              <h4>
                Then, move the slider below to a comfortable listening level.
                After that, click NEXT to begin the test.
              </h4>
            </div>
          </Container>
          <VolumeSlider
            handleVolume={(volume) => this.setState({ volume })}
            style={{ marginLeft: "30%" }}
          />
          {audioPlay ? (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleStop}
              style={{ margin: 5, width: 150, backgroundColor: "black" }}
            >
              Stop
            </Button>
          ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handlePlay}
                style={{
                  margin: 5,
                  width: 150,
                  backgroundColor: "black",
                }}
              >
                Play
              </Button>
            )}
          {this.renderNextButton()}
        </div>
      </Container>
    );
  }
}

export default VolumeAdjustment;
