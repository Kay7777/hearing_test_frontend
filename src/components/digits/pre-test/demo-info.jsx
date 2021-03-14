import React from "react";
import {
  Container,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

class DemoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: null,
      agePicker: []
    };
  }

  componentDidMount = () => {
    const agePicker = [];
    for (let i=18; i<=120; i++){
      agePicker.push(i);
    }
    this.setState({ agePicker });
  }

  handleAgeChange = (e) => {
    this.setState({ age: e.target.value });
  }

  renderButton = () => {
    const { age } = this.state;
    if (age !== null) {
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          style={{
            backgroundColor: "black",
            width: 100,
            margin: 10,
          }}
          onClick={() => this.props.handleClick(this.state.age)}
        >
          Next
        </Button>
      );
    } else {
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          style={{
            width: 100,
            margin: 10,
          }}
          disabled={true}
        >
          Next
        </Button>
      );
    }
  };

  render() {
    const { agePicker, age } = this.state;
    return (
      <Container>
        <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
          2
        </h2>
        <div style={{ marginTop: "5%", marginLeft: "5%" }}>
          <div id="age">
            <InputLabel id="label">Age</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select gender"
              value={age}
              onChange={this.handleAgeChange}
            >
              {
                agePicker.length !== 0 ?
                agePicker.map((age) => <MenuItem value={age}>{age}</MenuItem>)
                : null
              }
            </Select>
          </div>
          {this.renderButton()}
        </div>
      </Container>
    );
  }
}

export default DemoInfo;
