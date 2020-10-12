import React from "react";
import { Button } from "@material-ui/core";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceVolume: 0.5,
      index: 0,
      dbs: [0],
      noise: new Audio(process.env.PUBLIC_URL + "/audios/testnoise.wav"),
      audioStart: false
    };
  }

  switch = async () => {
    if (!this.state.audioStart) {
      this.state.noise.volume = this.state.sourceVolume;
      this.setState({ audioStart: true })
      await this.state.noise.play();
    } else {
      this.setState({ audioStart: false })
      this.state.noise.pause();
    }
  }

  componentDidUpdate = () => {
    this.state.noise.volume = this.state.sourceVolume;
  }

  goEasier = () => {
    const { sourceVolume, index, dbs } = this.state;
    dbs.push(dbs[index] + 3);
    this.setState({ dbs, index: index + 1 });
    if (sourceVolume * 10 ** (2 / 20) > 1) {
      this.setState({ sourceVolume: 1 });
    } else {
      this.setState({ sourceVolume: sourceVolume * 10 ** (3 / 20) });
    }
  };

  goHarder = () => {
    const { sourceVolume, index, dbs } = this.state;
    dbs.push(dbs[index] - 1);
    this.setState({ dbs, index: index + 1, sourceVolume: sourceVolume * 10 ** (-1 / 20) });
  };

  render() {
    console.log(this.state);
    const { dbs } = this.state;
    return (
      <div style={{ position: "relative", marginLeft: "30%", marginTop: "20%" }}>
        <div>Testing page!</div>
        <h1>{dbs[dbs.length - 1]}</h1>
        <Button variant="contained" color="primary" onClick={this.goEasier}>Increase 3 dB</Button>
        <Button variant="contained" color="secondary" onClick={this.goHarder}>Decrease 1 dB</Button>
        <Button variant="contained" onClick={this.switch}>Start / Stop</Button>
      </div>
    )
  }
}

export default Test;
