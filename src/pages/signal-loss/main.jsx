import React from "react";
import Welcome from "../../components/digits/start/welcome";
import AudioLoss1 from "../../components/signal-loss/test/audioloss1";
import AudioLoss2 from "../../components/signal-loss/test/audioloss2";
import Source1 from "../../components/signal-loss/test/source1";
import Source2 from "../../components/signal-loss/test/source2";
import Adjustment from "../../components/signal-loss/pre-test/adjustment";
import Questions from "../../components/signal-loss/pre-test/questions";
import Test from "../../components/signal-loss/test/test";
import End from "../../components/signal-loss/post-test/end";
import ICF from "../../components/signal-loss/pre-test/ICF";
import DemoInfo from "../../components/signal-loss/pre-test/demo-info";
import MidPage from "../../components/signal-loss/test/mid-page";
import PostQuestion from "../../components/signal-loss/post-test/questions";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: null,
      process: "welcome",
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
      order: [],
      age: null,
      gender: null,
      province: null,
      output: null
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
    setTimeout(() => {
      this.setState({ process: "icf" });
    }, 3000);
  }

  handleICFClick = () => {
    this.setState({ process: "demoinfo" });
  }

  handleDemoinfoClick = (ID, age, gender, province) => {
    this.setState({ process: "questions", age, gender, province, ID });
  }

  handleAdjustClick = (output, volume) => {
    console.log("The final volume", volume);
    this.setState({ output, volume, process: "test" });
  }

  handlePreQuestions = (questions, aids) => {
    this.setState({ questions, aids, process: "adjust" });
  }

  handlePostQuestions = async (postQuestion) => {
    // save data into database
    const { output, ID, timer1, timer2, timer3, timer4, dbs1, dbs2, dbs3, dbs4, questions, aids, order, age, gender, province } = this.state;
    await axios.post("/api/sentence/user/data", {
      output, ID, order, timer1, timer2, timer3, timer4, dbs1, dbs2, dbs3, dbs4, preQuestion: questions, postQuestion, aids, SNR: this.state.SNR, age, gender, province
    });
    this.setState({ process: "end" });
  }

  handleTest = () => {
    this.setState({ process: "CRM1" });
  }

  handleCRM1Click = (SNR, timer, dbs) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer1: timer, dbs1: dbs, process: "midpage1" })
  }
  handleCRM2Click = (SNR, timer, dbs) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer2: timer, dbs2: dbs, process: "midpage2" })
  }
  handleCRM3Click = (SNR, timer, dbs) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer3: timer, dbs3: dbs, process: "midpage3" })
  }
  handleCRM4Click = async (SNR, timer, dbs) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer4: timer, dbs4: dbs, process: "postquestion" })
  }

  handleMidPage1Click = () => {
    this.setState({ process: "CRM2" })
  }

  handleMidPage2Click = () => {
    this.setState({ process: "CRM3" })
  }

  handleMidPage3Click = () => {
    this.setState({ process: "CRM4" })
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
      case "welcome":
        return <Welcome />;
      case "icf":
        return <ICF handleClick={this.handleICFClick} />;
      case "demoinfo":
        return <DemoInfo handleClick={this.handleDemoinfoClick} />;
      case "adjust":
        return <Adjustment handleClick={this.handleAdjustClick} />
      case "questions":
        return <Questions handleClick={this.handlePreQuestions} />
      case "test":
        return <Test volume={volume} handleClick={this.handleTest} />
      case "CRM1":
        return this.returnTrainingMode(0, this.handleCRM1Click);
      case "midpage1":
        return <MidPage handleClick={this.handleMidPage1Click} section={"two"} />;
      case "CRM2":
        return this.returnTrainingMode(1, this.handleCRM2Click);
      case "midpage2":
        return <MidPage handleClick={this.handleMidPage2Click} section={"three"} />;
      case "CRM3":
        return this.returnTrainingMode(2, this.handleCRM3Click);
      case "midpage3":
        return <MidPage handleClick={this.handleMidPage3Click} section={"four"} />;
      case "CRM4":
        return this.returnTrainingMode(3, this.handleCRM4Click);
      case "postquestion":
        return <PostQuestion handleClick={this.handlePostQuestions} />
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
