import React from "react";
import axios from "axios";
import QuestionTable from "../../../assets/digits/question2-table";
import {
  TextField,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";

class Page10Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: "",
      checkBox: [],
      curr: "",
    };
  }
  componentDidMount = async () => {
    const doc = await axios.get("/api/digits/post-test-2/questions");
    this.setState({ questions: doc.data });
  };

  handleAddChoice = () => {
    const { checkBox, curr } = this.state;
    checkBox.push(curr);
    this.setState({ checkBox, curr: "" });
  };

  handleAdd = async () => {
    await axios.post("/api/digits/post-test-2/questions", {
      question: this.state.question,
      checkBox: this.state.checkBox,
    });
    await this.setState({ question: "", checkBox: [] });
    this.componentDidMount();
  };

  handleDelete = async (id) => {
    await axios.delete("/api/digits/post-test-2/questions/" + id);
    await this.setState({ question: "" });
    this.componentDidMount();
  };

  render() {
    const { questions, question, curr, checkBox } = this.state;
    return (
      <Container>
        <div className="jumbotron">
          <h1 style={{ margin: 20 }}>Post-Test Question 2</h1>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 20 }}
            onClick={() => this.props.history.push("/digits/database")}
          >
            Back
          </Button>
        </div>
        <div
          style={{
            position: "relative",
            marginTop: "5%",
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          <TextField
            label="question"
            value={question}
            style={{ width: "50%" }}
            multiline={true}
            onChange={(e) => this.setState({ question: e.target.value })}
          />
          <br />
          <TextField
            label="choice"
            value={curr}
            style={{ width: "50%", marginTop: 10 }}
            multiline={true}
            onChange={(e) => this.setState({ curr: e.target.value })}
          />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: 10, marginTop: 20 }}
            onClick={this.handleAddChoice}
          >
            Add a choice
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 10, marginTop: 20 }}
            onClick={this.handleAdd}
          >
            Add
          </Button>
          <br />
          <FormGroup style={{ marginLeft: 10 }}>
            {checkBox.map((choice) => {
              return (
                <FormControlLabel
                  control={<Checkbox checked={true} color="primary" />}
                  label={choice}
                />
              );
            })}
          </FormGroup>
          <br />
          <QuestionTable rows={questions} handleDelete={this.handleDelete} />
        </div>
      </Container>
    );
  }
}

export default Page10Question;
