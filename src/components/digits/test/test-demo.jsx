import React from "react";
import {
  Input,
  Container,
  CircularProgress,
  Fab,
  Button,
} from "@material-ui/core";
import BackspaceIcon from "@material-ui/icons/Backspace";

class TestDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noise: new Audio(process.env.PUBLIC_URL + "/functional-audio/noise.wav"),
      noiseVolume: this.props.volume / 100,
      audioVolume: this.props.volume / 100,
      audio1: new Audio(process.env.PUBLIC_URL + "/digits-audio/" + 8 + ".wav"),
      audio2: new Audio(process.env.PUBLIC_URL + "/digits-audio/" + 3 + ".wav"),
      audio3: new Audio(process.env.PUBLIC_URL + "/digits-audio/" + 6 + ".wav"),
      focus: 0,
      click: -1,
      input1: "",
      input2: "",
      input3: "",
      stage: 0,
      continue: true,
      promps: [
        "Instruction: Use your keyboard to enter numbers, or click the number pad on the screen",
        "Instruction: Use the delete button if you entered a number by accident. Or press backspace on your keyboard.",
        "Instruction: When you have finished entering the three digits, click OK to move to the next item. Or press Enter on your keyboard",
      ],
    };
    this.input1 = React.createRef();
    this.input2 = React.createRef();
    this.input3 = React.createRef();
  }

  componentDidMount = async () => {
    // preload audios
    const noise = new Audio(process.env.PUBLIC_URL + "/functional-audio/noise.wav");
    await noise.play();
    await noise.pause();
    for (let i = 1; i < 10; i++) {
      const audio = new Audio(process.env.PUBLIC_URL + "/digits-audio/" + i + ".wav");
      audio.volume = 0;
      await audio.play();
      await audio.pause();
    }
    this.setState({ stage: 1 });
    await this._focus();
    this.handlePlay();
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

  handlePlay = async () => {
    const {
      audioVolume,
      noiseVolume,
      noise,
      audio1,
      audio2,
      audio3,
    } = this.state;
    setTimeout(() => {
      noise.volume = noiseVolume;
      if (this.state.continue) noise.play();
      this.setState({stage: 4});
    }, 3100);
    setTimeout(() => {
      audio1.volume = audioVolume;
      if (this.state.continue) audio1.play();
      else noise.pause();
    }, 3500);
    setTimeout(() => {
      this.setState({ input1: "8", focus: 0, click: 8 });
    }, 4000);
    setTimeout(() => {
      audio2.volume = audioVolume;
      if (this.state.continue) audio2.play();
      else noise.pause();
    }, 4700);
    setTimeout(() => {
      this.setState({ input2: "3", focus: 1, click: 3 });
    }, 5200);
    setTimeout(() => {
      audio3.volume = audioVolume;
      if (this.state.continue) audio3.play();
      else noise.pause();
    }, 5900);
    setTimeout(() => {
      this.setState({ input3: "6", focus: 2, click: 6 });
    }, 6400);
    setTimeout(() => {
      noise.pause();
      this.setState({ stage: 2 });
    }, 7100);
    setTimeout(() => {
      this.setState({ click: -1, stage: 4 });
    }, 10500);
    setTimeout(() => {
      this.setState({ click: "x" });
      this.handleDelete();
    }, 11000);
    setTimeout(() => {
      this.setState({ click: -1 });
    }, 11600);
    setTimeout(() => {
      this.setState({ click: "x" });
      this.handleDelete();
    }, 12200);
    setTimeout(() => {
      this.setState({ click: -1 });
    }, 12800);
    setTimeout(() => {
      this.setState({ click: "x", stage: 3 });
      this.handleDelete();
    }, 13400);
    setTimeout(() => {
      this.setState({ click: -1, stage: 4 });
    }, 17000);
    setTimeout(() => {
      this.setState({ input2: "3", focus: 1, click: 3 });
    }, 17500);
    setTimeout(() => {
      this.setState({ input3: "6", focus: 2, click: 6 });
    }, 18200);
    setTimeout(() => {
      this.setState({ click: "ok" });
    }, 19000);
    setTimeout(() => {
      this.setState({
        input1: "",
        input2: "",
        input3: "",
        focus: 0,
        click: -1,
        stage: 1,
      });
      if (this.state.continue) {
        this.handlePlay();
      }
    }, 21000);
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

  handleNext = () => {
    this.setState({ continue: false });
    setTimeout(() => this.props.handleClick(), 200);
  };

  renderInputs = () => {
    const { input1, input2, input3, stage } = this.state;
    return (
      <div>
        <Input
          value={input1}
          inputRef={(input) => {
            this.input1 = input;
          }}
          inputProps={{
            maxLength: 1,
          }}
          required={true}
          style={{
            width: 40,
            marginRight: 10,
            paddingLeft: 13,
          }}
        />
        <Input
          value={input2}
          inputRef={(input) => {
            this.input2 = input;
          }}
          inputProps={{
            maxLength: 1,
          }}
          required={true}
          style={{ width: 40, paddingLeft: 13 }}
        />
        <Input
          value={input3}
          inputRef={(input) => {
            this.input3 = input;
          }}
          inputProps={{
            maxLength: 1,
          }}
          required={true}
          style={{ width: 40, marginLeft: 10, paddingLeft: 13 }}
        />
      </div>
    );
  };

  renderKeys = () => {
    const { stage, promps, click } = this.state;
    return (
      <div className="row">
        {
          <div className="col-4" style={{ marginLeft: "34%" }}>
            <div className="rows">
              <Fab
                color={click === 1 ? "primary" : "default"}
                style={{ marginLeft: 6, marginRight: 6 }}
              >
                1
              </Fab>
              <Fab
                color={click === 2 ? "primary" : "default"}
                style={{ marginLeft: 6, marginRight: 6 }}
              >
                2
              </Fab>
              <Fab
                color={click === 3 ? "primary" : "default"}
                style={{ marginLeft: 6, marginRight: 6 }}
              >
                3
              </Fab>
            </div>
          <div className="rows">
            <Fab
              color={click === 4 ? "primary" : "default"}
              style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
            >
              4
            </Fab>
            <Fab
              color={click === 5 ? "primary" : "default"}
              style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
            >
              5
            </Fab>
            <Fab
              color={click === 6 ? "primary" : "default"}
              style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
            >
              6
            </Fab>
          </div>
          <div className="rows">
            <Fab
              color={click === 7 ? "primary" : "default"}
              style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
            >
              7
            </Fab>
            <Fab
              color={click === 8 ? "primary" : "default"}
              style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
            >
              8
            </Fab>
            <Fab
              color={click === 9 ? "primary" : "default"}
              style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
            >
              9
            </Fab>
          </div>
          <div className="rows">
            <Fab
              color={click === "x" ? "primary" : "default"}
              style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
            >
              <BackspaceIcon />
            </Fab>
            <Fab
              color={click === "ok" ? "primary" : "default"}
              style={{ marginLeft: 6, marginRight: 6, marginTop: 10 }}
            >
              OK
            </Fab>
          </div>
        </div>
        }
        <div className="col">
          <h4 className="font-weight-light text-success">
            {stage === 0 ? null : promps[stage - 1]}
          </h4>
        </div>
      </div>
    );
  };

  render() {
    const { stage } = this.state;
    return (
      <Container style={{ textAlign: "center" }}>
        <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
          6
        </h2>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            marginTop: "2%",
          }}
        >
          {stage === 0 ? (
            <h1>Loading ... </h1>
          ) : (
              <div>
                <h2 className="font-weight-light">
                  Enter the three digits you heard. If you’re not sure, that’s
                  fine. Just guess.
              </h2>
                {this.renderInputs()}
                <br />
                {this.renderKeys()}
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={this.handleNext}
                  style={{
                    backgroundColor: "black",
                    width: 100,
                  }}
                >
                  Next
              </Button>
              </div>
            )}
        </div>
      </Container>
    );
  }
}

export default TestDemo;
