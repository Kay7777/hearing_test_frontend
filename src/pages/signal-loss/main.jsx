import React from "react";
import Test from "../../components/signal-loss/test/index";
import Adjustment from "../../components/signal-loss/pre-test/index";
import Data from "../../components/signal-loss/data/index";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "adjust",
      volume: 0.1,
      SNR: null,
      timer: [],
      dbs: [],
      lossOrSource: []
    };
  }

  componentDidMount = async () => {
  };

  handleAdjustClick = (volume) => {
    console.log("The final volume", volume);
    this.setState({ volume, process: "test" });
  }

  handleTestClick = (SNR, timer, lossOrSource, dbs) => {
    this.setState({ SNR, timer, dbs, lossOrSource, process: "data" })
  }

  renderProcess = () => {
    const { process, volume, timer, dbs, lossOrSource, SNR } = this.state;
    switch (process) {
      case "adjust":
        return <Adjustment handleClick={this.handleAdjustClick} />
      case "test":
        return <Test volume={volume} handleClick={this.handleTestClick} />;
      case "data":
        return <Data volume={volume} SNR={SNR} timer={timer} dbs={dbs} lossOrSource={lossOrSource} />
      default:
        return null;
    }
  };

  render() {
    return this.renderProcess();
  }
}

export default Main;
