import React from "react";
import { Container, Button, TextField } from "@material-ui/core";

class Id1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  randomPage = () => {
    const { id } = this.state;
    const index = Number(id) % 3;
    if (index === 0) {
      this.props.history.push("/version1/" + id);
    } else if (index === 1) {
      this.props.history.push("/version2/" + id);
    } else {
      this.props.history.push("/version3/" + id);
    }
  };

  render() {
    const { id } = this.state;
    return (
      <Container>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            marginTop: "20%",
          }}
        >
          <h5>Please enter the Study ID # you see at the top of the screen</h5>
          <h5>Once you have entered the number, please click "Submit"</h5>
          <TextField
            value={id}
            onChange={(e) => this.setState({ id: e.target.value })}
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={this.randomPage}
            style={{
              backgroundColor: "black",
              marginLeft: 10,
            }}
          >
            Submit
          </Button>
        </div>
      </Container>
    );
  }
}

export default Id1;
