import React from "react";
import axios from "axios";
import Table from "../../../assets/signal-loss/data-table";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: this.props.volume,
      SNR: this.props.SNR,
      timer: this.props.timer,
      dbs: this.props.dbs,
      lossOrSource: this.props.lossOrSource,
      array: []
    };
  }

  componentDidMount = () => {
    const array = [];
    const { timer, lossOrSource, dbs } = this.state;
    for (let i = 0; i < timer.length; i++) {
      array.push({
        timer: timer[i],
        decibel: dbs[i],
        lossOrSource: lossOrSource[i]
      })
    }
    this.setState({ array });
  }

  render() {
    const { array, volume, SNR } = this.state;
    return (
      <div class="jumbotron">
        <h2>User Data</h2>
        <h4>volume: {volume}</h4>
        <h4>SNR: {SNR}</h4>
        <Table rows={array} />
      </div>
    );
  }
}

export default Data;
