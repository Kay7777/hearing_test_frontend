import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import Table from "../../assets/signal-loss/data-table";
import { ExportReactCSV } from "../../components/partials/csv";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [], login: false, password: "", datas: [], headers: [] };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/sentence/user/data");
    const array = [];
    const datas = [];
    const headers = ["ID", "block1", "SNR1", "block2", "SNR2", "block3", "SNR3", "block4", "SNR4", "Gender", "Province", "BirthYear", "Aids", "Output"];
    
    // wirte headers
    doc.data.map(data => {
      for (let i=1; i<=4; i++) {
        let timer;
        let dbs;
        switch(i){
            case 1:
              timer = "timer1";
                dbs = "dbs1";
                break;
            case 2:
              timer = "timer2";
                dbs = "dbs2";
                break;
            case 3:
              timer = "timer3";
                dbs = "dbs3";
                break;
            case 4:
              timer = "timer4";
                dbs = "dbs4";
                break;
            default:
                break;
        }
        for (let j=1; j<=data[timer].length; j++) {
            headers.push(`${timer}-t${j}`);
            headers.push(`${dbs}-t${j}`);
        }
      }
    });
    // write datas
    doc.data.map(data => {
      const row = [
        String(data["ID"]), 
        String(data["order"][0]), String(data["SNR"][0]),
        String(data["order"][1]), String(data["SNR"][1]),
        String(data["order"][2]), String(data["SNR"][2]),
        String(data["order"][3]), String(data["SNR"][3]),
        String(data["gender"]), String(data["province"]),
        String(data["age"]), String(data["aids"]),
        String(data["output"])
      ];
      for (let i=1; i<=4; i++) {
        let timer;
        let dbs;
        switch(i){
            case 1:
              timer = "timer1";
                dbs = "dbs1";
                break;
            case 2:
              timer = "timer2";
                dbs = "dbs2";
                break;
            case 3:
              timer = "timer3";
                dbs = "dbs3";
                break;
            case 4:
              timer = "timer4";
                dbs = "dbs4";
                break;
            default:
                break;
        }
        for (let j=0; j<data[timer].length; j++) {
            row.push(data[timer][j]);
            row.push(data[dbs][j+1]);
        }
      }
        datas.push(row);
    });
    // write the array
    const obj = {};
    doc.data.map(data => {
      obj["ID"] = String(data["ID"]);
      obj["SNR"] = JSON.stringify(data["SNR"]);
      obj["gender"] = data["gender"];
      obj["province"] = data["province"];
      obj["birth"] = data["age"];
      obj["aids"] = String(data["aids"]);
      obj["order"] = data["order"];
      obj["output"] = data["output"];
      obj["timer1"] = JSON.stringify(data["timer1"]);
      obj["timer2"] = JSON.stringify(data["timer2"]);
      obj["timer3"] = JSON.stringify(data["timer3"]);
      obj["timer4"] = JSON.stringify(data["timer4"]);
      obj["dbs1"] = JSON.stringify(data["dbs1"]);
      obj["dbs2"] = JSON.stringify(data["dbs2"]);
      obj["dbs3"] = JSON.stringify(data["dbs3"]);
      obj["dbs4"] = JSON.stringify(data["dbs4"]);
      const preQuestion = [];
      const postQuestion = [];
      Object.keys(data["preQuestion"]).map(key => {
        preQuestion.push(data["preQuestion"][key]);
        return null;
      });
      Object.keys(data["postQuestion"]).map(key => {
        postQuestion.push(data["postQuestion"][key]);
        return null;
      });
      obj["preQuestion"] = preQuestion;
      obj["postQuestion"] = postQuestion;
      array.push(obj);
    });
    this.setState({ array, headers, datas });
  }

  deleteData = async (id) => {
    await axios.delete("/api/sentence/user/data/" + id);
    this.componentDidMount();
  }

  login = () => {
    if (this.state.password === "thisisthepassword") {
      this.setState({ login: true });
    } else {
      window.alert("Wrong login information, retry please!");
    }
  }

  render() {
    const { array, login, password, datas, headers } = this.state;
    return (
      login ?
        <Container>
          <h3 style={{ textAlign: "center" }}>Welcome to hearing test app database center</h3>
          <br />
          {
            array.length === 0 ?
              <h4>Loading ... (or there is no data in the database)</h4>
              :
              <div>
                <ExportReactCSV data={datas} headers={headers} fileName={"HearingTestData"} />
                <br />
                <Table data={array} />
                <h5>
                  Notes:
                </h5>
                <h6>
                  Pre-questions:
                </h6>
                <h6>1. I think my hearing in general is</h6>
                <h6>2. I think my hearing in quiet is</h6>
                <h6>3. I think my hearing in background noise is</h6>
                <h6>
                  Post-questions:
                </h6>
                <h6>1. How difficult did you find this experiment? Please make a mark on the line below.</h6>
                <h6>2. How much effort did it take for you to complete this experiment? Please make a mark on the line below.</h6>
              </div>

          }
        </Container>
        :
        <Container>
          <div style={{ position: "fixed", left: "30%", right: "30%", top: "20%" }}>
            <TextField value={password} style={{ width: 300 }} onChange={(e) => this.setState({ password: e.target.value })} label="password" type="password" /><br /><br />
            <Button variant="contained" color="primary" onClick={this.login} >Log In</Button>
          </div>
        </Container>
    );
  }
}

export default Data;
