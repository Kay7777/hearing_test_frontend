import React from "react";
import {
  Container,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import ScoreSlider from "../../../assets/digits/score-slider";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: ["I think my hearing in general is", "I think my hearing in quiet is",
        "I think my hearing in background noise is"],
      hearing: {},
      hearingAids: null
    };
  }

  validateHearing = () => {
    const { questions, hearing, hearingAids } = this.state;
    if (Object.keys(hearing).length !== questions.length || hearingAids === null) return false;
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
    const { questions, hearing, hearingAids } = this.state;
    if (questions.length === 0) {
      return null;
    } else if (this.validateHearing()) {
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => this.props.handleClick(hearing, hearingAids)}
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
          {questions.map((question, index) => {
            return (
              <div style={{ marginTop: 10 }}>
                <h4>{question}</h4>
                {hearing[questions[index]] &&
                  hearing[questions[index]].wellness ? null : (
                    <h6 className="text-danger">* must provide value</h6>
                  )}
                <div className="row">
                  <h6 style={{ marginTop: 10, marginLeft: 15 }}>
                    Bad
                  </h6>
                  <h6 style={{ marginTop: 10, marginLeft: "20%" }}>
                    Fair
                  </h6>
                  <h6 style={{ marginTop: 10, marginLeft: "20%" }}>
                    Excellent
                  </h6>
                </div>
                <ScoreSlider
                  handleScore={(value) => this.handleSlider(index, value)}
                  style={{ marginLeft: "30%" }}
                />
              </div>
            );
          })}
          <br />
          <FormControl component="fieldset" style={{ marginBottom: 10 }}>
            <h4 component="legend">Do you wear or have you ever worn hearing aids?</h4>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
              onChange={(e) => this.setState({ hearingAids: e.target.value })}
            >
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          <br />
          {this.renderButton()}
        </div>
      </Container>
    );
  }
}

export default Questions;
