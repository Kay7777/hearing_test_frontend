import React from "react";
import { Button, Container } from "@material-ui/core";
import VolumeSlider from "../../../assets/signal-loss/volume-slider";

class VolumeAdjustment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volumeAdjuest: false,
      audio: new Audio(process.env.PUBLIC_URL + "/audios/adjust.wav"),
      audioPlay: false,
      audioVolume: 0.1,
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

  handleNext = () => {
    this.state.audio.pause();
    this.props.handleClick(this.state.audioVolume);
  };

  render() {
    const { audioPlay } = this.state;
    return (
      <Container>
        <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
          5
        </h2>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            marginTop: "10%",
          }}
        >
          <Container>
            <h4>
              Set your device's volume to the 50%. Click PLAY to listen to an
              audio sample.
            </h4>
            <h4>
              Then, move the slider below to a comfortable listening level.
              After that, click NEXT to begin the test.
            </h4>
          </Container>
          <VolumeSlider
            handleVolume={this.handleVolume}
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
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 5, width: 150, backgroundColor: "black" }}
            onClick={this.handleNext}
          >
            Next
          </Button>
        </div>
      </Container>
    );
  }
}

export default VolumeAdjustment;
