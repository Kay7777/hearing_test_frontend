import React from "react";
import AudioLoss1 from "../../components/signal-loss/test/audioloss1";
import AudioLoss2 from "../../components/signal-loss/test/audioloss2";
import Source1 from "../../components/signal-loss/test/source1";
import Source2 from "../../components/signal-loss/test/source2";
import Adjustment from "../../components/signal-loss/pre-test/adjustment";
import Questions from "../../components/signal-loss/pre-test/questions";
import Test from "../../components/signal-loss/test/test";
import End from "../../components/signal-loss/post-test/end";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "adjust",
      volume: 0.1,
      SNR: [],
      timer1: [],
      timer2: [],
      timer3: [],
      timer4: [],
      dbs1: [],
      dbs2: [],
      dbs3: [],
      dbs4: [],
      questions: {},
      aids: null,
      order: []
    };
  }
  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  componentDidMount = () => {
    const order = ["AudioLoss1", "AudioLoss2", "Source1", "Source2"];
    this.shuffle(order);
    this.setState({ order });
  }

  handleAdjustClick = (volume) => {
    console.log("The final volume", volume);
    this.setState({ volume, process: "questions" });
  }

  handleQuestions = (questions, aids) => {
    this.setState({ questions, aids, process: "test" });
  }

  handleTest = () => {
    this.setState({ process: "CRM1" });
  }

  handleCRM1Click = (SNR, timer, dbs) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer1: timer, dbs1: dbs, process: "CRM2" })
  }
  handleCRM2Click = (SNR, timer, dbs) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer2: timer, dbs2: dbs, process: "CRM3" })
  }
  handleCRM3Click = (SNR, timer, dbs) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer3: timer, dbs3: dbs, process: "CRM4" })
  }
  handleCRM4Click = async (SNR, timer, dbs) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    await this.setState({ SNR: newSNR, timer4: timer, dbs4: dbs })

    // save data into database
    const { timer1, timer2, timer3, timer4, dbs1, dbs2, dbs3, dbs4, questions, aids, order } = this.state;
    await axios.post("/api/sentence/user/data", {
      order, timer1, timer2, timer3, timer4, dbs1, dbs2, dbs3, dbs4, questions, aids, SNR: this.state.SNR
    });

    this.setState({ process: "end" });
  }

  returnTrainingMode = (num, func) => {
    const { order, volume } = this.state;
    if (order[num] === "AudioLoss1") {
      return <AudioLoss1 volume={volume} handleClick={func} cycle={"AudioLoss"} />;
    } else if (order[num] === "AudioLoss2") {
      return <AudioLoss2 volume={volume} handleClick={func} cycle={"AudioLoss"} />;
    } else if (order[num] === "Source1") {
      return <Source1 volume={volume} handleClick={func} cycle={"Source"} />;
    } else if (order[num] === "Source2") {
      return <Source2 volume={volume} handleClick={func} cycle={"Source"} />;
    }
  }

  renderProcess = () => {
    const { process, volume } = this.state;
    switch (process) {
      case "adjust":
        return <Adjustment handleClick={this.handleAdjustClick} />
      case "questions":
        return <Questions handleClick={this.handleQuestions} />
      case "test":
        return <Test volume={volume} handleClick={this.handleTest} />
      case "CRM1":
        return this.returnTrainingMode(0, this.handleCRM1Click);
      case "CRM2":
        return this.returnTrainingMode(1, this.handleCRM2Click);
      case "CRM3":
        return this.returnTrainingMode(2, this.handleCRM3Click);
      case "CRM4":
        return this.returnTrainingMode(3, this.handleCRM4Click);
      case "end":
        return <End />
      default:
        return null;
    }
  };

  render() {
    return this.renderProcess();
  }
}

export default Main;
