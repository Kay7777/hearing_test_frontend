import React from "react";
import { Button, Container } from "@material-ui/core";
import VolumeSlider from "../../../assets/number/volume-slider";

class VolumeAdjustment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volumeAdjuest: false,
      audio: new Audio(process.env.PUBLIC_URL + "/audios/adjust.wav"),
      audioPlay: false,
      audioVolume: 0.1,
      done: false,
    };
  }
  componentDidMount = () => {
    const { audio, audioVolume } = this.state;
    audio.volume = audioVolume;
  };

  componentDidUpdate = () => {
    const { audio, audioVolume } = this.state;
    console.log("volume:", audioVolume);
    audio.volume = audioVolume;
  };

  calculateDB = (audio) => {
    const audioCtx = new AudioContext();
    const processor = audioCtx.createScriptProcessor(0, 1, 1);
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(processor);
    source.connect(audioCtx.destination);
    processor.connect(audioCtx.destination);
    processor.onaudioprocess = function (evt) {
      const input = evt.inputBuffer.getChannelData(0);
      const len = input.length;
      let total = 0;
      let i = 0;
      let rms; // root mean square
      while (i < len) total += Math.abs(input[i++]);
      rms = Math.sqrt(total / len);
      console.log(rms * 100);
    };
  };

  handleHeadPhone = () => {
    const { volumeAdjuest } = this.state;
    this.setState({ volumeAdjuest: !volumeAdjuest });
  };

  handleSpeaker = () => {
    const { volumeAdjuest } = this.state;
    this.setState({ volumeAdjuest: !volumeAdjuest });
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

  handleNext = async () => {
    await this.handleStop();
    this.setState({ done: true });
  };

  handleVolume = (volume) => {
    this.setState({ audioVolume: volume / 100 });
    this.props.handleVolume(volume);
  };

  askAudioOutput = () => {
    const { audioPlay } = this.state;
    return (
      <div>
        <Container>
          <h6 className="font-weight-light">
            Set your device's volume to the 50%. Click PLAY to listen to an
            audio sample.
          </h6>
          <h6 className="font-weight-light">
            Then, move the slider below to a comfortable listening level. After
            that, click NEXT to begin the activity.
          </h6>
        </Container>

        <div className="row">
          <VolumeSlider handleVolume={this.handleVolume} />
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
      </div>
    );
  };

  readyToStart = () => {
    return (
      <Container>
        <h6 className="font-weight-light">
          The activity is about to begin. Please WAIT until the clip has finished
          playing before typing the numbers you hear. You can't change your
          response once you've entered it.
        </h6>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 5, width: 150, backgroundColor: "black" }}
          onClick={this.props.handleNext}
        >
          OK
        </Button>
      </Container>
    );
  };

  render() {
    const { done } = this.state;
    return done ? this.readyToStart() : this.askAudioOutput();
  }
}

export default VolumeAdjustment;
