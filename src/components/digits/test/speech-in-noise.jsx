import React from "react";
import { Input, Container, Fab } from "@material-ui/core";
import CountDown from "../../../assets/digits/count-down";
import BackspaceIcon from "@material-ui/icons/Backspace";

class SpeechInNoise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noise: new Audio(process.env.PUBLIC_URL + "/functional-audio/noise.wav"),
      noiseVolume: this.props.volume / 100,
      audioVolume: this.props.volume / 100,
      realAnswer: "",
      focus: 0,
      input1: "",
      input2: "",
      input3: "",
      step: 1,
      loading: true,
      time: 0,
      timer: [],
      dbs: [0],
      countDown: 3,
      okButton: false,
    };
    this.input1 = React.createRef();
    this.input2 = React.createRef();
    this.input3 = React.createRef();
    this.numOfQues = 23;
  }

  componentDidMount = async () => {
    setTimeout(async () => {
      await this.setState({ loading: false });
      await this._focus();
      this.handlePlay();
    }, 3000);
  };

  componentDidUpdate = () => {
    this._focus();
  };

  _focus = () => {
    const { focus } = this.state;
    switch (focus) {
      case 0:
        return this.input1.focus();
      case 1:
        return this.input2.focus();
      case 2:
        return this.input3.focus();
      default:
        return null;
    }
  };

  startTimer = () => {
    this.timer = setInterval(
      () =>
        this.setState({
          time: this.state.time + 0.01,
        }),
      10
    );
  };
  stopTimer = () => {
    clearInterval(this.timer);
  };
  resetTimer = () => {
    this.setState({ time: 0 });
  };

  handlePlay = async () => {
    const { audioVolume, noiseVolume, timer, noise } = this.state;
    if (this.state.time !== 0) {
      this.stopTimer();
      timer.push(Number(this.state.time).toFixed(3));
      this.resetTimer();
      this.setState({ timer });
    }
    const audios = [];
    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * 9) + 1;
      await this.setState({
        realAnswer: this.state.realAnswer + index.toString(),
      });
      audios.push(
        new Audio(process.env.PUBLIC_URL + "/digits-audio/" + index + ".wav")
      );
    }
    setTimeout(() => {
      noise.volume = noiseVolume;
      this.startTimer();
      noise.play();
    }, 100);
    setTimeout(() => {
      const audio = audios[0];
      audio.volume = audioVolume;
      audio.play();
    }, 500);
    setTimeout(() => {
      const audio = audios[1];
      audio.volume = audioVolume;
      audio.play();
    }, 1700);
    setTimeout(() => {
      const audio = audios[2];
      audio.volume = audioVolume;
      audio.play();
    }, 2900);
    setTimeout(() => {
      noise.pause();
    }, 4100);
  };

  checkAnswer = async () => {
    const { realAnswer, input1, input2, input3, step } = this.state;
    const userAnswer = input1 + input2 + input3;
    if (realAnswer !== userAnswer) {
      const audioVolume = this.goEasier(step);
      await this.setState({ audioVolume });
      console.log(
        "WRONG, increasing audio volume to " + this.state.audioVolume
      );
    } else {
      const audioVolume = this.goHarder(step);
      await this.setState({ audioVolume });
      console.log(
        "RIGHT, decreasing audio volume to " + this.state.audioVolume
      );
    }
    if (step !== this.numOfQues) {
      this.setState({
        realAnswer: "",
        input1: "",
        input2: "",
        input3: "",
        step: step + 1,
        focus: 0,
      });
      this.handlePlay();
    } else {
      // Timer
      this.stopTimer();
      const timer = this.state.timer;
      timer.push(Number(this.state.time).toFixed(3));
      // SNR
      let sum = 0;
      for (let i = this.numOfQues - 5; i < this.numOfQues; i++) {
        sum += this.state.dbs[i];
      }
      const SNR = Number(sum / 5).toFixed(3);
      this.props.handleClick(SNR, timer);
    }
  };

  goEasier = () => {
    const { audioVolume, step, dbs } = this.state;
    if (step <= 4) {
      dbs.push(dbs[step - 1] + 4);
      this.setState({ dbs });
      if (audioVolume * 10 ** (4 / 20) > 1) {
        return 1;
      } else {
        return audioVolume * 10 ** (4 / 20);
      }
    } else {
      dbs.push(dbs[step - 1] + 2);
      this.setState({ dbs });
      if (audioVolume * 10 ** (2 / 20) > 1) {
        return 1;
      } else {
        return audioVolume * 10 ** (2 / 20);
      }
    }
  };

  goHarder = () => {
    const { audioVolume, step, dbs } = this.state;
    if (step <= 4) {
      dbs.push(dbs[step - 1] - 4);
      this.setState({ dbs });
      return audioVolume * 10 ** (-4 / 20);
    } else {
      dbs.push(dbs[step - 1] - 2);
      this.setState({ dbs });
      return audioVolume * 10 ** (-2 / 20);
    }
  };

  changeAnswer = (value) => {
    const { focus } = this.state;
    switch (focus) {
      case 0:
        if (value.length !== 1) {
          return this.setState({ input1: value });
        } else {
          return this.setState({ input1: value, focus: 1 });
        }
      case 1:
        if (value.length !== 1) {
          return this.setState({ input2: value });
        } else {
          return this.setState({ input2: value, focus: 2 });
        }
      case 2:
        return this.setState({ input3: value });
      default:
        return null;
    }
  };

  handleDelete = () => {
    const { focus, input2, input3 } = this.state;
    switch (focus) {
      case 0:
        return this.setState({ input1: "" });
      case 1:
        if (input2.length === 1) {
          return this.setState({ input2: "" });
        }
        return this.setState({ input2: "", focus: 0 });
      case 2:
        if (input3.length === 1) {
          return this.setState({ input3: "" });
        }
        return this.setState({ input3: "", focus: 1 });
      default:
        return null;
    }
  };

  handleKeyEnter = (e) => {
    if (this.state.input3 !== "" && e.keyCode === 13) {
      this.checkAnswer();
    }
  };

  renderInputs = () => {
    const { input1, input2, input3 } = this.state;
    return (
      <div>
        <Input
          value={input1}
          onClick={() => this.setState({ focus: 0 })}
          inputRef={(input) => {
            this.input1 = input;
          }}
          inputProps={{
            maxLength: 1,
          }}
          required={true}
          onChange={(e) => this.changeAnswer(e.target.value)}
          style={{ width: 40, marginRight: 10, paddingLeft: 13 }}
        />
        <Input
          value={input2}
          onClick={() => this.setState({ focus: 1 })}
          inputRef={(input) => {
            this.input2 = input;
          }}
          inputProps={{
            maxLength: 1,
          }}
          required={true}
          onChange={(e) => this.changeAnswer(e.target.value)}
          style={{ width: 40, paddingLeft: 13 }}
        />
        <Input
          value={input3}
          onClick={() => this.setState({ focus: 2 })}
          inputRef={(input) => {
            this.input3 = input;
          }}
          inputProps={{
            maxLength: 1,
          }}
          required={true}
          onKeyDown={this.handleKeyEnter}
          onChange={(e) => this.changeAnswer(e.target.value)}
          style={{ width: 40, marginLeft: 10, paddingLeft: 13 }}
        />
      </div>
    );
  };

  renderKeys = () => {
    return (
      <div>
        <div className="rows">
          <Fab
            color="default"
            onClick={() => this.changeAnswer("1")}
            style={{ marginLeft: 6, marginRight: 6 }}
          >
            1
          </Fab>
          <Fab
            color="default"
            onClick={() => this.changeAnswer("2")}
            style={{ marginLeft: 6, marginRight: 6 }}
          >
            2
          </Fab>
          <Fab
            color="default"
            onClick={() => this.changeAnswer("3")}
            style={{ marginLeft: 6, marginRight: 6 }}
          >
            3
          </Fab>
        </div>
        <div className="rows">
          <Fab
            color="default"
            onClick={() => this.changeAnswer("4")}
            style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
          >
            4
          </Fab>
          <Fab
            color="default"
            onClick={() => this.changeAnswer("5")}
            style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
          >
            5
          </Fab>
          <Fab
            color="default"
            onClick={() => this.changeAnswer("6")}
            style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
          >
            6
          </Fab>
        </div>
        <div className="rows">
          <Fab
            color="default"
            onClick={() => this.changeAnswer("7")}
            style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
          >
            7
          </Fab>
          <Fab
            color="default"
            onClick={() => this.changeAnswer("8")}
            style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
          >
            8
          </Fab>
          <Fab
            color="default"
            onClick={() => this.changeAnswer("9")}
            style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
          >
            9
          </Fab>
        </div>
        <div className="rows">
          <Fab
            color="default"
            onClick={this.handleDelete}
            style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
          >
            <BackspaceIcon />
          </Fab>
          <Fab
            color="default"
            onClick={this.checkAnswer}
            disabled={this.renderOKButton()}
            style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
          >
            OK
          </Fab>
        </div>
      </div>
    );
  };

  renderOKButton = () => {
    const { input1, input2, input3 } = this.state;
    if (!!input1 && !!input2 && !!input3) return false;
    return true;
  };

  render() {
    const { step, loading } = this.state;
    return (
      <Container style={{ textAlign: "center" }}>
        <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
          7
        </h2>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              position: "relative",
              marginTop: "10%",
            }}
          >
            <CountDown />
          </div>
        ) : (
            <div
              style={{
                textAlign: "center",
                position: "relative",
                marginTop: "2%",
              }}
            >
              <h2 className="font-weight-light">
                Enter the three digits you heard using the displayed keypad and your mouse OR your number keys on your keyboard. Press OK to submit. 
              </h2>
              {this.renderInputs()}
              <h2 className="font-weight-lighter" style={{ marginTop: 10 }}>
                Step {step} of {this.numOfQues}
              </h2>
              {this.renderKeys()}
            </div>
          )}
      </Container>
    );
  }
}

export default SpeechInNoise;
