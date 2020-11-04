import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import Table from "../../assets/signal-loss/data-table";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    const doc = await axios.get("/api/sentence/user/data/" + this.props.match.params.id);
    console.log(doc.data);
    this.setState({ data: doc.data }, () => console.log("data", this.state.data));
  }

  render() {
    const { data } = this.state;
    return (
      <div class="jumbotron">
        {
          data ?
            <div>
              {/* Date: {data.date} */}
              <h3>Questions:</h3>
              {
                Object.keys(data.questions).map(key => {
                  return (
                    <div>
                      <h4>{key + ": " + data.questions[key]}</h4>
                      <br />
                    </div>
                  )
                })
              }
              <h4>Hearing aids: {String(data.aids)}</h4>
              <br />
              <Table SNR={data.SNR[0]} timer={data.timer1} decibel={data.dbs1} cycle={"1"} />
              <br />
              <Table SNR={data.SNR[1]} timer={data.timer2} decibel={data.dbs2} cycle={"2"} />
              <br />
              <Table SNR={data.SNR[2]} timer={data.timer3} decibel={data.dbs3} cycle={"3"} />
              <br />
              <Table SNR={data.SNR[3]} timer={data.timer4} decibel={data.dbs4} cycle={"4"} />
            </div>
            :
            <div>Loading ...</div>
        }

      </div>
    );
  }
}

export default Data;
