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
      audioVolume: 0.1,
      output: null
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

  renderButton = () => {
    const { output, audioVolume } = this.state;
    if (output !== null) {
      return <Button
        variant="contained"
        color="primary"
        style={{ margin: 20, width: 150, backgroundColor: "black" }}
        onClick={() => {
          this.state.audio.pause();
          this.props.handleClick(output, audioVolume)
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
    const { audioPlay, output } = this.state;
    return (
      <Container>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            marginTop: "20%",
          }}
        >
          <Container>
            <h5>You can use either speakers or headphones to complete this experiment. Headphones will work best. Please select what you are using: headphones or speakers</h5>
            <div>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={output}
                onChange={this.handleChangeOutput}
                style={{ width: 150 }}
              >
                <MenuItem value="headphone">headphone</MenuItem>
                <MenuItem value="speaker">speaker</MenuItem>
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
            </div>
            <VolumeSlider
              handleVolume={this.handleVolume}
              style={{ marginLeft: "30%" }}
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
