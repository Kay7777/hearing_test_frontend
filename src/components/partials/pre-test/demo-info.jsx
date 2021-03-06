import React from "react";
import {
  Container,
  Button,
  InputLabel, Select, MenuItem, TextField
} from "@material-ui/core";


class DemoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: null,
      age: null,
      gender: null,
      province: null,
      backupProvince: null,
      agePicker: []
    };
  }

  componentDidMount = () => {
    const agePicker = [];
    for (let i=18; i<=120; i++){
      agePicker.push(i);
    }
    this.setState({ agePicker, ID: Math.random().toString().substr(2, 4) });
  }

  handleAgeChange = (e) => {
    this.setState({ age: e.target.value });
  }

  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  }

  handleProvinceChange = (e) => {
    this.setState({ province: e.target.value });
  }

  handleValidation = () => {
    const { age, gender, province } = this.state;
    if (age !== null && gender !== null && province !== null) {
      return true;
    }
    return false;
  }

  renderButton = () => {
    const { ID, age, gender, province, backupProvince } = this.state;
    if (this.handleValidation()) {
      if (backupProvince === null) {
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
          style={{ margin: 20, width: 150, backgroundColor: "black" }}
          onClick={() => this.props.handleClick(ID, age, gender, backupProvince)}
        >
          Next
    </Button>
      }

    } else {
      return <div>
        <Button
          variant="contained"
          color="primary"
          disabled
          style={{ margin: 20, width: 150 }}
        >
          Next
        </Button>
        <p>You cannot progress to the next step because either: 1) you have not completed the questions or 2) your birthdate indicates you are under 18 years of age.</p>
        </div>
    }
  }

  render() {
    const { ID, age, gender, province, backupProvince, agePicker } = this.state;
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
          <h5>You may contact the investigators at jcbhlab@ualberta.ca and use this number to withdraw your data up to one week after you have completed the experiment.</h5>
          <h5>Please answer the questions below using the provided dropdown boxes.</h5>
          <br />
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
          <br /><br />
          <div>
            <InputLabel id="label">Gender</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select gender"
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
            <InputLabel id="label">Province/Territory of Residence</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select location"
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
              <MenuItem value="Other">Other/Not Canada</MenuItem>
            </Select>
            <br />
            {
              province === "Other" ?
                <TextField
                  value={backupProvince}
                  label="Location"
                  onChange={(e) => this.setState({ backupProvince: e.target.value })}
                  style={{ width: 300 }}
                />
                :
                null
            }
          </div>
          <br /><br />
          {this.renderButton()}
        </div>
      </Container>
    );
  }
}

export default DemoInfo;
