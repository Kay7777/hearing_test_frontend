import React from "react";
import Welcome from "../../components/digits/pre-test/welcome";
import Consent from "../../components/digits/pre-test/consent";
import Hearing from "../../components/digits/pre-test/hearing";
import DemoInfo from "../../components/digits/pre-test/demo-info";
import VolumeAdjustment from "../../components/digits/pre-test/adjustment";
import SpeechInNoise from "../../components/digits/test/speech-in-noise";
import TestDemo from "../../components/digits/test/test-demo";
import Environment from "../../components/digits/pre-test/environment";
import Submit from "../../components/digits/post-test/submit";
import PostTestQuestions from "../../components/digits/post-test/post-test-questions";
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
      volume: 0, // starts at 10/100
      output: null,
      SNR: null,
      location: null
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
    this.setState({ email, process: "demo-info" });
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

  handleAdjustmentClick = (volume, output) => {
    this.setState({ process: "demo", volume, output });
  };

  handleDemoClick = () => {
    this.setState({ process: "testing" });
  };

  handleTestingClick = (SNR, timer) => {
    this.setState({ SNR, timer, process: "post-test" });
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
      volume,
      SNR,
      timer,
    });
    window.location = "/";
  };

  renderProcess = () => {
    const { process, volume } = this.state;
    switch (process) {
      case "welcome":
        return <Welcome />;
      case "consent":
        return <Consent handleClick={this.handleConsentClick} />;
      case "demo-info":
        return <DemoInfo handleClick={this.handleBirthClick} />;
      case "hearing":
        return <Hearing handleClick={this.handleHearClick} />;
      case "environment":
        return <Environment handleClick={this.handleEnvironmentClick} />;
      case "adjustment":
        return (
          <VolumeAdjustment
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
      case "post-test":
        return <PostTestQuestions handleClick={this.handlePostTestQuesClick} />;
      case "submit":
        return <Submit handleClick={this.handleSubmitClick} />;
      default:
        return null;
    }
  };

  render() {
    return this.renderProcess();
  }
}

export default Main;
