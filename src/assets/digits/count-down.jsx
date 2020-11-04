import React from "react";
import { Fab } from "@material-ui/core";

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 3,
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ countDown: 2 });
    }, 1000);
    setTimeout(() => {
      this.setState({ countDown: 1 });
    }, 2000);
  };

  render() {
    return (
      <Fab
        color="primary"
        style={{
          backgroundColor: "black",
          borderRadius: "100%",
          height: 180,
          width: 180,
        }}
      >
        <h1>{this.state.countDown}</h1>
      </Fab>
    );
  }
}

export default CountDown;
