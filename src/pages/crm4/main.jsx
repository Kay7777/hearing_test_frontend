import React from "react";
import axios from "axios";

import ICF from "../../components/partials/pre-test/ICF";
import Welcome from "../../components/partials/pre-test/welcome";
import Adjustment from "../../components/partials/pre-test/adjustment";
import Questions from "../../components/partials/pre-test/questions";
import DemoInfo from "../../components/partials/pre-test/demo-info";

import Test from "../../components/crm4/test";
import MidPage from "../../components/crm4/mid-page";
import AudioLoss1 from "../../components/crm4/audioloss1";
import AudioLoss2 from "../../components/crm4/audioloss2";
import Source1 from "../../components/crm4/source1";
import Source2 from "../../components/crm4/source2";

import PostQuestion1 from "../../components/partials/post-test/questions1";
import PostQuestion2 from "../../components/partials/post-test/questions2";
import PostQuestion3 from "../../components/partials/post-test/questions3";
import PostQuestion4 from "../../components/partials/post-test/questions4";
import End from "../../components/partials/post-test/end";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: null,
      email: "",
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
      questions1: [],
      questions2: [],
      questions3: [],
      questions4: [],
      answers1: [],
      answers2: [],
      answers3: [],
      answers4: [],
      correct1: [],
      correct2: [],
      correct3: [],
      correct4: [],
      preQuestions: {},
      postQuestions1: {},
      postQuestions2: {},
      postQuestions3: {},
      postQuestions4: {},
      didWearAids: null,
      willWearAids: null,
      order: [],
      age: null,
      gender: null,
      province: null,
      output: null,
      reversals: null
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

  componentDidMount = async () => {
    const doc = await axios.get("/api/crm4/reversals");
    await this.setState({reversals: doc.data.reversals});
    const order = ["AudioLoss1", "AudioLoss2", "Source1", "Source2"];
    this.shuffle(order);
    this.setState({ order });
    setTimeout(() => {
      this.setState({ process: "icf" });
    }, 3000);
  }

  handleICFClick = (email) => {
    this.setState({ email, process: "demoinfo" });
  }

  handleDemoinfoClick = (ID, age, gender, province) => {
    this.setState({ process: "questions", age, gender, province, ID });
  }

  handlePreQuestions = (questions, aids) => {
    this.setState({ preQuestions: questions, didWearAids: aids, process: "adjust" });
  }

  handleAdjustClick = (output, aids, volume) => {
    this.setState({ output, volume, process: "test", willWearAids: aids });
  }

  handleTest = () => {
    this.setState({ process: "CRM1" });
  }

  handleCRM1Click = (SNR, timer, dbs, questions, answers, correct) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer1: timer, dbs1: dbs, questions1: questions, answers1: answers, correct1: correct, process: "postquestion1" })
  }
  handleCRM2Click = (SNR, timer, dbs, questions, answers, correct) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer2: timer, dbs2: dbs, questions2: questions, answers2: answers, correct2: correct, process: "postquestion2" })
  }
  handleCRM3Click = (SNR, timer, dbs, questions, answers, correct) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer3: timer, dbs3: dbs, questions3: questions, answers3: answers, correct3: correct, process: "postquestion3" })
  }
  handleCRM4Click = async (SNR, timer, dbs, questions, answers, correct) => {
    const newSNR = this.state.SNR;
    newSNR.push(SNR);
    this.setState({ SNR: newSNR, timer4: timer, dbs4: dbs, questions4: questions, answers4: answers, correct4: correct, process: "postquestion4" })
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


  handlePostQuestions1 = (postQuestion) => {
    this.setState({postQuestions1: postQuestion, process: "midpage1"})
  }

  handlePostQuestions2 = (postQuestion) => {
    this.setState({postQuestions2: postQuestion, process: "midpage2"})
  }

  handlePostQuestions3 = (postQuestion) => {
    this.setState({postQuestions3: postQuestion, process: "midpage3"})
  }

  handlePostQuestions4 = async (postQuestion) => {
    await this.setState({ postQuestions4: postQuestion });
    await this.handleSubmit(() => this.setState({process: "end"}));
  }

  handleSubmit = async (callback) => {
    const { 
      output, email, ID, reversals, SNR,
      didWearAids, willWearAids, preQuestions,
      order, age, gender, province, 
      timer1, timer2, timer3, timer4, 
      dbs1, dbs2, dbs3, dbs4, 
      questions1, questions2, questions3, questions4,
      postQuestions1, postQuestions2, postQuestions3, postQuestions4,
      answers1, answers2, answers3, answers4,
      correct1, correct2, correct3, correct4
    } = this.state;
    const trials1 = timer1.length;
    const trials2 = timer2.length;
    const trials3 = timer3.length;
    const trials4 = timer4.length;
    await axios.post("/api/crm4/user/data", {
      output, email, ID, order, preQuestions, didWearAids, 
      willWearAids, SNR, age, gender, province, 
      timer1, timer2, timer3, timer4, 
      dbs1, dbs2, dbs3, dbs4, 
      questions1, questions2, questions3, questions4,
      postQuestions1, postQuestions2, postQuestions3, postQuestions4,
      answers1, answers2, answers3, answers4,
      correct1, correct2, correct3, correct4, 
      reversals, trials1, trials2, trials3, trials4
    });
    callback();
  }

  returnTrainingMode = (num, func) => {
    const { order, volume, reversals } = this.state;
    if (order[num] === "AudioLoss1") {
      return <AudioLoss1 reversals={reversals} volume={volume} handleClick={func} cycle={"AudioLoss"} block={num} />;
    } else if (order[num] === "AudioLoss2") {
      return <AudioLoss2 reversals={reversals} volume={volume} handleClick={func} cycle={"AudioLoss"} block={num} />;
    } else if (order[num] === "Source1") {
      return <Source1 reversals={reversals} volume={volume} handleClick={func} cycle={"Source"} block={num} />;
    } else if (order[num] === "Source2") {
      return <Source2 reversals={reversals} volume={volume} handleClick={func} cycle={"Source"} block={num} />;
    }
  }

  renderProcess = () => {
    const { process, volume, ID } = this.state;
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
      case "postquestion1":
        return <PostQuestion1 handleClick={this.handlePostQuestions1} />
      case "midpage1":
        return <MidPage handleClick={this.handleMidPage1Click} section={"two"} />;
      case "CRM2":
        return this.returnTrainingMode(1, this.handleCRM2Click);
      case "postquestion2":
        return <PostQuestion2 handleClick={this.handlePostQuestions2} />
      case "midpage2":
        return <MidPage handleClick={this.handleMidPage2Click} section={"three"} />;
      case "CRM3":
        return this.returnTrainingMode(2, this.handleCRM3Click);
      case "postquestion3":
        return <PostQuestion3 handleClick={this.handlePostQuestions3} />
      case "midpage3":
        return <MidPage handleClick={this.handleMidPage3Click} section={"four"} />;
      case "CRM4":
        return this.returnTrainingMode(3, this.handleCRM4Click);
      case "postquestion4":
        return <PostQuestion4 handleClick={this.handlePostQuestions4} />
      case "end":
        return <End ID={ID}/>
      default:
        return null;
    }
  };

  render() {
    return this.renderProcess();
  }
}

export default Main;
