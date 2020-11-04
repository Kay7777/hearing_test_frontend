import React from "react";
import Welcome from "../../components/digits/start/welcome";
import Consent from "../../components/digits/start/consent";
import Hearing from "../../components/digits/start/hearing";
import Birth from "../../components/digits/start/birth";
import VolumeAdjustment from "../../components/digits/test/adjustment";
import SpeechInNoise from "../../components/digits/test/speech-in-noise";
import TestDemo from "../../components/digits/test/test-demo";
import Environment from "../../components/digits/test/environment";
import Submit from "../../components/digits/post-test/submit";
import ResultVideo from "../../components/digits/post-test/result-video";
import PostTestQuestions from "../../components/digits/post-test/post-test-questions";
import End from "../../components/digits/post-test/end";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "welcome",
      consent: {},
      email: "",
      hearing: {},
      version: 1, // need to do 3 version here
      volume: 10, // starts at 10/1000
      SNR: null,
      location: null,
      result: ["pass", "fail"][Math.floor(Math.random() * 2)],
    };
  }

  componentDidMount = async () => {
    // used Geolocation-db API
    const doc = await axios.get(
      "https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91"
    );
    this.setState({ location: doc.data });
    setTimeout(() => {
      this.setState({ process: "consent" });
    }, 3000);
  };

  handleConsentClick = (email) => {
    this.setState({ email, process: "birth" });
  };

  handleBirthClick = (birth) => {
    this.setState({ birth, process: "hearing" });
  };

  handleHearClick = async (hearing) => {
    await this.setState({ hearing, process: "environment" });
  };

  handleEnvironmentClick = () => {
    this.setState({ process: "adjustment" });
  };

  handleAdjustmentClick = () => {
    this.setState({ process: "demo" });
  };

  handleDemoClick = () => {
    this.setState({ process: "testing" });
  };

  handleTestingClick = (SNR, timer) => {
    this.setState({ SNR, timer, process: "result" });
  };

  handleResultClick = () => {
    this.setState({ process: "post-test-questions" });
  };

  handlePostTestQuesClick = () => {
    this.setState({ process: "submit" });
  };

  handleSubmitClick = async () => {
    const {
      email,
      location,
      consents,
      hearing,
      birth,
      result,
      volume,
      SNR,
      timer,
    } = this.state;
    await axios.post("/api/user/data", {
      email,
      location,
      consents,
      hearing,
      birth,
      result,
      volume,
      SNR,
      timer,
    });
    this.setState({ process: "end" });
  };

  renderProcess = () => {
    const { process, volume } = this.state;
    switch (process) {
      case "welcome":
        return <Welcome />;
      case "consent":
        return <Consent handleClick={this.handleConsentClick} />;
      case "birth":
        return <Birth handleClick={this.handleBirthClick} />;
      case "hearing":
        return <Hearing handleClick={this.handleHearClick} />;
      case "environment":
        return <Environment handleClick={this.handleEnvironmentClick} />;
      case "adjustment":
        return (
          <VolumeAdjustment
            handleVolume={(volume) => this.setState({ volume })}
            handleClick={this.handleAdjustmentClick}
          />
        );
      case "demo":
        return <TestDemo volume={volume} handleClick={this.handleDemoClick} />;
      case "testing":
        return (
          <SpeechInNoise
            volume={volume}
            handleClick={this.handleTestingClick}
          />
        );
      case "result":
        return <ResultVideo handleClick={this.handleResultClick} />;
      case "post-test-questions":
        return <PostTestQuestions handleClick={this.handlePostTestQuesClick} />;
      case "submit":
        return <Submit handleClick={this.handleSubmitClick} />;
      case "end":
        return <End />;
      default:
        return null;
    }
  };

  render() {
    return this.renderProcess();
  }
}

export default Main;
