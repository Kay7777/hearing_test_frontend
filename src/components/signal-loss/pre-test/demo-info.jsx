import React from "react";
import {
  Container,
  Button,
  TextField, InputLabel, Select, MenuItem
} from "@material-ui/core";

class DemoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: null,
      age: null,
      gender: null,
      province: null
    };
  }

  componentDidMount = () => {
    this.setState({ ID: Math.random().toString().substr(2, 12) });
  }

  changeAge = (e) => {
    this.setState({ age: e.target.value })
  }

  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  }

  handleProvinceChange = (e) => {
    this.setState({ province: e.target.value });
  }

  renderButton = () => {
    const { ID, age, gender, province } = this.state;
    if (age !== null && gender !== null && province !== null) {
      return <Button
        variant="contained"
        color="primary"
        style={{ margin: 20, width: 150, backgroundColor: "black" }}
        onClick={() => this.props.handleClick(ID, age, gender, province)}
      >
        Next
    </Button>
    } else {
      return <Button
        variant="contained"
        color="primary"
        disabled
        style={{ margin: 20, width: 150 }}
      >
        Next
    </Button>
    }
  }

  render() {
    const { ID, age, gender, province } = this.state;
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
          <h3>Your participant ID is: {ID}</h3>
          <h5>(please note this down if you wish to withdraw your data)</h5>
          <br />
          <TextField label="Age" type="number" value={age} onChange={this.changeAge} />
          <br /><br />
          <div>
            <InputLabel id="label">Gender</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={gender}
              onChange={this.handleGenderChange}
            >
              <MenuItem value="male">male</MenuItem>
              <MenuItem value="female">female</MenuItem>
              <MenuItem value="prefer not to answer">prefer not to answer</MenuItem>
            </Select>
          </div>
          <br />
          <div>
            <InputLabel id="label">Province of Residence</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={province}
              onChange={this.handleProvinceChange}
            >
              <MenuItem value="Alberta">Alberta</MenuItem>
              <MenuItem value="British Columbia">British Columbia</MenuItem>
              <MenuItem value="Manitoba">Manitoba</MenuItem>
              <MenuItem value="New Brunswick">New Brunswick</MenuItem>
              <MenuItem value="Newfoundland and Labrador">Newfoundland and Labrador</MenuItem>
              <MenuItem value="Nova Scotia">Nova Scotia</MenuItem>
              <MenuItem value="Ontario">Ontario</MenuItem>
              <MenuItem value="Prince Edward Island">Prince Edward Island</MenuItem>
              <MenuItem value="Quebec">Quebec</MenuItem>
              <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
              <MenuItem value="Northwest Territories">Northwest Territories</MenuItem>
              <MenuItem value="Nunavut">Nunavut</MenuItem>
              <MenuItem value="Yukon">Yukon</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </div>
          <br /><br />
          {this.renderButton()}
        </div>
      </Container>
    );
  }
}

export default DemoInfo;
