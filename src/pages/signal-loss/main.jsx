import React from "react";
import AudioLoss from "../../components/signal-loss/test/audioloss";
import Source from "../../components/signal-loss/test/source";
import Adjustment from "../../components/signal-loss/pre-test/adjustment";
import Questions from "../../components/signal-loss/pre-test/questions";
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
      aids: null
    };
  }

  handleAdjustClick = (volume) => {
    console.log("The final volume", volume);
    this.setState({ volume, process: "questions" });
  }

  handleQuestions = (questions, aids) => {
    this.setState({ questions, aids, process: "CRM1" });
  }

  handleCRM1Click = (SNR, timer, dbs) => {
    console.log("handleCRM1Click works");
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer1: timer, dbs1: dbs, process: "CRM2" }, () => console.log(this.state.process))
  }
  handleCRM2Click = (SNR, timer, dbs) => {
    console.log("handleCRM2Click works");
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer2: timer, dbs2: dbs, process: "CRM3" })
  }
  handleCRM3Click = (SNR, timer, dbs) => {
    console.log("handleCRM3Click works");
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer3: timer, dbs3: dbs, process: "CRM4" })
  }
  handleCRM4Click = async (SNR, timer, dbs) => {
    console.log("handleCRM4Click works");
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    await this.setState({ SNR: newSNR, timer4: timer, dbs4: dbs })

    // save data into database
    const { timer1, timer2, timer3, timer4, dbs1, dbs2, dbs3, dbs4, questions, aids } = this.state;
    await axios.post("/api/sentence/user/data", {
      timer1, timer2, timer3, timer4, dbs1, dbs2, dbs3, dbs4, questions, aids, SNR: this.state.SNR
    });

    this.setState({ process: "end" });
  }

  renderProcess = () => {
    const { process, volume } = this.state;
    switch (process) {
      case "adjust":
        return <Adjustment handleClick={this.handleAdjustClick} />
      case "questions":
        return <Questions handleClick={this.handleQuestions} />
      case "CRM1":
        return <AudioLoss volume={volume} handleClick={this.handleCRM1Click} cycle={"1"} />;
      case "CRM3":
        return <AudioLoss volume={volume} handleClick={this.handleCRM3Click} cycle={"3"} />;
      case "CRM2":
        return <Source volume={volume} handleClick={this.handleCRM2Click} cycle={"2"} />;
      case "CRM4":
        return <Source volume={volume} handleClick={this.handleCRM4Click} cycle={"4"} />;
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
