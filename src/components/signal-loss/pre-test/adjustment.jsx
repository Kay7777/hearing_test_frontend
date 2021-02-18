import React from "react";
import { Button, Container, TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
import VolumeSlider from "../../../assets/signal-loss/volume-slider";

class VolumeAdjustment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volumeAdjuest: false,
      audio: new Audio(process.env.PUBLIC_URL + "/audios/adjust.wav"),
      audioPlay: false,
      audioVolume: 0,
      output: null,
      aids: null,
    };
  }
  componentDidMount = () => {
    const { audio, audioVolume } = this.state;
    audio.volume = audioVolume;
  };

  componentDidUpdate = () => {
    const { audio, audioVolume } = this.state;
    audio.volume = audioVolume;
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

  handleVolume = (volume) => {
    this.setState({ audioVolume: volume / 100 });
  };

  handleChangeOutput = (e) => {
    this.setState({ output: e.target.value });
  }

  handleAidsChange = (e) => {
    this.setState({ aids: e.target.value });
  }

  renderButton = () => {
    const { output, aids, audioVolume } = this.state;
    if (!!output && aids != null && !!audioVolume) {
      return <Button
        variant="contained"
        color="primary"
        style={{ margin: 20, width: 150, backgroundColor: "black" }}
        onClick={() => {
          this.state.audio.pause();
          this.props.handleClick(output, aids, audioVolume)
        }}
      >
        Next
    </Button>
    } else {
      return <Button
        variant="contained"
        color="primary"
        disabled
        style={{ margin: 20, width: 150 }}
      >
        Next
    </Button>
    }
  }

  render() {
    const { audioPlay, output, aids } = this.state;
    return (
      <Container>
        <div
          style={{
            textAlign: "left",
            position: "relative",
            marginTop: "10%",
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
            <div id="aids">
              <h5>Will you be wearing amplification (e.g., hearing aid(s), cochlear implant(s), bone anchored hearing aid(s), etc.) when you complete this experiment?</h5>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={aids}
                onChange={this.handleAidsChange}
                style={{ width: 150 }}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </div>
            <br />
            <div>
              <h5>
                Please set your computer volume to approximately 50%. Click PLAY to listen to an audio sample.
            </h5>
              <h5>
                Move the slider bar to your most comfortable listening level. Once comfortable, click NEXT to begin the study.
            </h5>
            <h5>Please do not adjust your computer volume during the experiment. </h5>
            </div>
            <VolumeSlider
              handleVolume={this.handleVolume}
              style={{ marginLeft: 5 }}
            />
          </Container>
          <br />
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
          {this.renderButton()}
        </div>
      </Container>
    );
  }
}

export default VolumeAdjustment;
