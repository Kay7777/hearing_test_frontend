import React from "react";
import VolumeAdjustment from "../../components/number/volume-adjust/main";
import SpeechInNoise from "../../components/number/speech-in-noise/main";
import Environment from "../../components/number/helpers/environment";
import Submit from "../../components/number/helpers/submit";
import { Container } from "@material-ui/core";
import axios from "axios";

class Version3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "environment",
      volume: 10,
      SNR: null,
      timer: [],
      v: 1,
      result: ["pass", "fail"][Math.floor(Math.random() * 2)],
      round: 1,
      id: this.props.match.params.id,
      searchDone: false,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/data/" + this.state.id);
    if (doc.data)
      this.setState({
        round: 2,
        volume: doc.data.volume,
        searchDone: true,
        process: "testing",
      });
    else this.setState({ searchDone: true });
  };

  saveData = async () => {
    console.log(this.state);
    const { SNR, result, timer, round, volume } = this.state;
    if (round === 1) {
      await axios.post("/api/data", {
        id: this.state.id,
        version: 3,
        SNR1: SNR,
        result: result,
        volume,
        timer1: timer,
        round: 1,
      });
      this.props.history.push("/result/" + result);
    } else {
      await axios.post("/api/data", {
        id: this.state.id,
        SNR2: SNR,
        timer2: timer,
        round: 2,
      });
      this.props.history.push("/final");
    }
  };

  renderProcess = () => {
    const { process, round } = this.state;
    switch (process) {
      case "environment":
        return (
          <Environment
            handleNext={() => this.setState({ process: "adjustment" })}
          />
        );
      case "adjustment":
        return (
          <VolumeAdjustment
            handleVolume={(volume) => this.setState({ volume })}
            handleNext={() => this.setState({ process: "testing" })}
          />
        );
      case "testing":
        return (
          <SpeechInNoise
            volume={this.state.volume}
            handleFinish={(SNR, timer) =>
              this.setState({ process: "submit", SNR, timer })
            }
          />
        );
      case "submit":
        return <Submit handleSubmit={this.saveData} round={round} />;
      default:
        return <process />;
    }
  };

  render() {
    const { searchDone } = this.state;
    return (
      <Container>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            marginTop: "20%",
          }}
        >
          {searchDone ? this.renderProcess() : <process />}
        </div>
      </Container>
    );
  }
}

export default Version3;
