import React from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import ScoreSlider from "../../../assets/digits/score-slider";

class Hearing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      hearing: {},
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/digits/pre-test/questions");
    const questions = doc.data.map((data) => data.question);
    this.setState({ questions });
  };

  validateHearing = () => {
    const { questions, hearing } = this.state;
    if (Object.keys(hearing).length !== questions.length) return false;
    for (const key in hearing) {
      if (Object.keys(hearing[key]).length !== 2) return false;
    }
    return true;
  };

  handleWellness = (index, value) => {
    const { hearing, questions } = this.state;
    this.setState(() => {
      if (hearing[questions[index]]) {
        const obj = hearing[questions[index]];
        obj["wellness"] = value;
      } else {
        hearing[questions[index]] = {
          wellness: value,
        };
      }
      return { hearing };
    });
  };

  handleConfidence = (index, value) => {
    const { hearing, questions } = this.state;
    this.setState(() => {
      if (hearing[questions[index]]) {
        const obj = hearing[questions[index]];
        obj["confidence"] = value;
      } else {
        hearing[questions[index]] = {
          confidence: value,
        };
      }
      return { hearing };
    });
  };

  renderButton = () => {
    const { questions, hearing } = this.state;
    if (questions.length === 0) {
      return null;
    } else if (this.validateHearing()) {
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => this.props.handleClick(hearing)}
          style={{
            backgroundColor: "black",
            width: 200,
            marginBottom: 10,
          }}
        >
          OK
        </Button>
      );
    } else {
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          style={{
            width: 200,
            marginBottom: 10,
          }}
          disabled={true}
        >
          OK
        </Button>
      );
    }
  };

  render() {
    const { hearing, questions } = this.state;
    return (
      <Container>
        <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
          3
        </h2>
        <div
          style={{
            position: "relative",
            marginTop: "3%",
            marginBottom: "5%",
            marginLeft: "10%",
            marginRight: "10%",
          }}
        >
          <hr />
          {questions.map((question, index) => {
            return (
              <div style={{ marginTop: 10 }}>
                <h4>{question}</h4>
                <h5>How well you hear in this situation?</h5>
                {hearing[questions[index]] &&
                  hearing[questions[index]].wellness ? null : (
                    <h6 className="text-danger">* must provide value</h6>
                  )}
                <div className="row">
                  <h6 style={{ marginTop: 10, marginLeft: 15 }}>
                    Not well at all
                  </h6>
                  <h6 style={{ marginTop: 10, marginLeft: "30%" }}>
                    Very well
                  </h6>
                </div>
                <ScoreSlider
                  handleScore={(value) => this.handleWellness(index, value)}
                  style={{ marginLeft: "30%" }}
                />
                <h5>
                  How confident are you that you can manage this situation?
                </h5>
                {hearing[questions[index]] &&
                  hearing[questions[index]].confidence ? null : (
                    <h6 className="text-danger">* must provide value</h6>
                  )}
                <div className="row">
                  <h6 style={{ marginTop: 10, marginLeft: 15 }}>
                    Not confident
                  </h6>
                  <h6 style={{ marginTop: 10, marginLeft: "28%" }}>
                    Very confident
                  </h6>
                </div>
                <ScoreSlider
                  handleScore={(value) => this.handleConfidence(index, value)}
                  style={{ marginLeft: "30%" }}
                />
                <hr />
              </div>
            );
          })}
          <br />
          {this.renderButton()}
        </div>
      </Container>
    );
  }
}

export default Hearing;
