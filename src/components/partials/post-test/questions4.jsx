import React from "react";
import {
  Container,
  Button,
} from "@material-ui/core";
import ScoreSlider from "../../../assets/digits/score-slider";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: ["How difficult did you find this block? Please make a mark on the line below.",
        "How much effort did it take for you to complete this block? Please make a mark on the line below."],
      hearing: {},
    };
  }

  validateHearing = () => {
    const { questions, hearing } = this.state;
    if (Object.keys(hearing).length !== questions.length) return false;
    return true;
  };

  handleSlider = (index, value) => {
    const { hearing, questions } = this.state;
    this.setState(() => {
      hearing[questions[index]] = value;
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
          Submit
        </Button>
      );
    } else {
      return (
        <div>
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
          Submit
        </Button>
        <p>You cannot progress to the next step because you have not completed the questions.</p>
        </div>
      );
    }
  };

  render() {
    const { hearing, questions } = this.state;
    return (
      <Container>
        <div
          style={{
            position: "relative",
            marginTop: "5%",
            marginBottom: "5%",
            marginLeft: "10%",
            marginRight: "10%",
          }}
        >
          <hr />
          <div style={{ marginTop: 10 }}>
            <h4>{questions[0]}</h4>
            {hearing[questions[0]] &&
              hearing[questions[0]].wellness ? null : (
                <h6 className="text-danger">* must provide value</h6>
              )}
            <div className="row">
              <h6 style={{ marginTop: 10, marginLeft: 15 }}>
                Really Hard
                  </h6>
              <h6 style={{ marginTop: 10, marginLeft: "32%" }}>
                Really Easy
                  </h6>
            </div>
            <ScoreSlider
              handleScore={(value) => this.handleSlider(0, value)}
              style={{ marginLeft: "30%" }}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <h4>{questions[1]}</h4>
            {hearing[questions[1]] &&
              hearing[questions[1]].wellness ? null : (
                <h6 className="text-danger">* must provide value</h6>
              )}
            <div className="row">
              <h6 style={{ marginTop: 10, marginLeft: 15 }}>
                Minimal
                  </h6>
              <h6 style={{ marginTop: 10, marginLeft: "35%" }}>
                Maximum
                  </h6>
            </div>
            <ScoreSlider
              handleScore={(value) => this.handleSlider(1, value)}
              style={{ marginLeft: "30%" }}
            />
          </div>
          <br />
          {this.renderButton()}
        </div>
      </Container>
    );
  }
}

export default Questions;
