import React from "react";
import {
  Container,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import ScoreSlider from "../../../assets/digits/score-slider";
import axios from "axios";

class PostTestQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions1: [],
      questions2: [],
      questions3: [],
      answers1: {},
      answers2: {},
      answers3: {},
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/digits/post-test-1/questions");
    const doc2 = await axios.get("/api/digits/post-test-2/questions");
    const doc3 = await axios.get("/api/digits/post-test-3/questions");
    const questions1 = doc1.data.map((data) => data.question);
    const questions3 = doc3.data.map((data) => data.question);
    const questions2 = doc2.data;
    const answers2 = {};
    for (let row of questions2) {
      answers2[row["question"]] = [];
    }
    this.setState({ questions1, questions2, questions3, answers2 });
  };

  handleAnswer1 = (index, answer) => {
    const { questions1, answers1 } = this.state;
    answers1[questions1[index]] = answer;
    this.setState({ answers1 });
  };

  handleAnswer2 = (boolean, questionIndex, choiceIndex) => {
    const { questions2, answers2 } = this.state;
    if (boolean) {
      const array = answers2[questions2[questionIndex]["question"]];
      array.push(questions2[questionIndex]["checkBox"][choiceIndex]);
      answers2[questions2[questionIndex]["question"]] = array;
    } else {
      const array = answers2[questions2[questionIndex]["question"]].filter(
        (data) => data !== questions2[questionIndex]["checkBox"][choiceIndex]
      );
      answers2[questions2[questionIndex]["question"]] = array;
    }
    this.setState({ answers2 });
  };

  handleAnswer3 = (answer, index) => {
    const { questions3, answers3 } = this.state;
    answers3[questions3[index]] = answer;
    this.setState({ answers3 });
  };

  validateAnswers = () => {
    const {
      answers1,
      answers2,
      answers3,
      questions1,
      questions2,
      questions3,
    } = this.state;
    return (
      Object.keys(answers1).length === questions1.length &&
      // Object.keys(answers2).length === questions2.length &&
      Object.keys(answers3).length === questions3.length
    );
  };

  renderButton = () => {
    const { questions1, answers1, answers2, answers3 } = this.state;
    if (questions1.length === 0) {
      return null;
    } else if (this.validateAnswers()) {
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => this.props.handleClick(answers1, answers2, answers3)}
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
    const { questions1, answers1, questions2, questions3 } = this.state;
    return (
      <Container>
        <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
          10
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
          {questions1.map((question, index) => {
            return (
              <div>
                <h4>{question}</h4>
                {!!answers1[questions1[index]] ? null : (
                  <h6 className="text-danger">* must provide value</h6>
                )}

                <div className="row">
                  <h6 style={{ marginLeft: "2%" }}>Strongly disagree</h6>
                  <h6 style={{ marginLeft: "25%" }}>Strongly agree</h6>
                </div>
                <ScoreSlider
                  handleScore={(value) => this.handleAnswer1(index, value)}
                />
                <br />
                <br />
              </div>
            );
          })}
          {questions2.map((row, questionIndex) => {
            return (
              <div>
                <h4>{row.question}</h4>
                <FormGroup style={{ marginLeft: 10 }}>
                  {row.checkBox.map((choice, choiceIndex) => {
                    return (
                      <FormControlLabel
                        onChange={(e) =>
                          this.handleAnswer2(
                            e.target.checked,
                            questionIndex,
                            choiceIndex
                          )
                        }
                        control={<Checkbox color="primary" />}
                        label={choice}
                      />
                    );
                  })}
                </FormGroup>
              </div>
            );
          })}
          <br />
          <br />
          {questions3.map((question, index) => {
            return (
              <div>
                <h4>{question}</h4>
                <TextField
                  style={{ width: "40%", marginLeft: 10 }}
                  onChange={(e) => this.handleAnswer3(e.target.value, index)}
                />
              </div>
            );
          })}
          <br />
          <br />
          {this.renderButton()}
        </div>
      </Container>
    );
  }
}

export default PostTestQuestions;
