import React from "react";
import axios from "axios";
import { Button, Container, TextField } from "@material-ui/core";
import Table from "../../assets/signal-loss/data-table";
import { ExportReactCSV } from "../../components/partials/csv";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newReversals: null, reversals: null, array: [], login: false, password: "", datas: [], headers: [] };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/crm1/user/data");
    const setting = await axios.get("/api/crm1/reversals");
    const array = [];
    const datas = [];
    const headers = [
      "ID", "Email", "Reversals", "Gender", "Province", "BirthYear", "DidWearAids", "WillWearAids", "Output", 
      "preQuestion1", "preQuestion2", "preQuestion3",
      "block1", "trials1", "SNR1", "b1-postQuestion1", "b1-postQuestion2",
      "block2", "trials2", "SNR2", "b2-postQuestion1", "b2-postQuestion2",
      "block3", "trials3", "SNR3", "b3-postQuestion1", "b3-postQuestion2",
      "block4", "trials4", "SNR4", "b4-postQuestion1", "b4-postQuestion2",
    ];
    
    // wirte headers
    // find the largest trials in each block
    let trials1 = 0;
    let trials2 = 0;
    let trials3 = 0;
    let trials4 = 0;
    doc.data.map(data => {
      if (data["timer1"].length > trials1) trials1 = data["timer1"].length;
      if (data["timer2"].length > trials2) trials2 = data["timer2"].length;
      if (data["timer3"].length > trials3) trials3 = data["timer3"].length;
      if (data["timer4"].length > trials4) trials4 = data["timer4"].length;
    })
    for (let i=1; i<=4; i++) {
      let trials;
      switch(i){
        case 1:
          trials = trials1;
          break;
        case 2:
          trials = trials2;
          break;
        case 3:
          trials = trials3;
          break;
        case 4:
          trials = trials4;
          break;
      }
      for (let j=1; j<=trials; j++) {
        headers.push(`timer${i}-t${j}`);
        headers.push(`dbs${i}-t${j}`);
        headers.push(`question${i}-t${j}`);
        headers.push(`answer${i}-t${j}`);
        headers.push(`correct${i}-t${j}`);
      }
    };
    // write datas
    doc.data.map(data => {
      /*
       "ID", "Email", "Reversals", "Gender", "Province", "BirthYear", "DidWearAids", "WillWearAids", "Output", 
      "preQuestion1", "preQuestion2", "preQuestion3",
      "block1", "trials1", "SNR1", "b1-postQuestion1", "b1-postQuestion2",
      "block2", "trials2", "SNR2", "b2-postQuestion1", "b2-postQuestion2",
      "block3", "trials3", "SNR3", "b3-postQuestion1", "b3-postQuestion2",
      "block4", "trials4", "SNR4", "b4-postQuestion1", "b4-postQuestion2",
      */
      const row = [
        String(data["ID"]), String(data["email"]), String(data["reversals"]), String(data["gender"]), String(data["province"]),
        String(data["age"]), String(data["didWearAids"]), String(data["willWearAids"]), String(data["output"])
      ];
      // add pre and post questions
      Object.keys(data["preQuestions"]).map(key => {
        row.push(data["preQuestions"][key]);
      });
      row.push(
        String(data["order"][0]), String(data["trials1"]), String(data["SNR"][0])
      )
      Object.keys(data["postQuestions1"]).map(key => {
        row.push(data["postQuestions1"][key]);
      });
      row.push(
        String(data["order"][1]), String(data["trials2"]), String(data["SNR"][1])
      )
      Object.keys(data["postQuestions2"]).map(key => {
        row.push(data["postQuestions2"][key]);
      });
      row.push(
        String(data["order"][2]), String(data["trials3"]), String(data["SNR"][2])
      )
      Object.keys(data["postQuestions3"]).map(key => {
        row.push(data["postQuestions3"][key]);
      });
      row.push(
        String(data["order"][3]), String(data["trials4"]), String(data["SNR"][3])
      )
      Object.keys(data["postQuestions4"]).map(key => {
        row.push(data["postQuestions4"][key]);
      });
      // add correct, questions, answers, etc.
      for (let i=1; i<=4; i++) {
        let timer;
        let dbs;
        let questions;
        let answers;
        let correct;
        let trials;
        switch(i){
          case 1:
            timer = "timer1";
            dbs = "dbs1";
            questions = "questions1";
            answers = "answers1";
            correct = "correct1";
            trials = trials1;
            break;
          case 2:
            timer = "timer2";
            dbs = "dbs2";
            questions = "questions2";
            answers = "answers2";
            correct = "correct2";
            trials = trials2;
            break;
          case 3:
            timer = "timer3";
            dbs = "dbs3";
            questions = "questions3";
            answers = "answers3";
            correct = "correct3";
            trials = trials3;
            break;
          case 4:
            timer = "timer4";
            dbs = "dbs4";
            questions = "questions4";
            answers = "answers4";
            correct = "correct4";
            trials = trials4;
            break;
          default:
            break;
        }
        for (let j=0; j<trials; j++) {
            row.push(data[timer][j]);
            row.push(data[dbs][j+1]);
            row.push(data[questions][j]);
            row.push(data[answers][j]);
            row.push(JSON.stringify(data[correct][j]));
        }
      }
        datas.push(row);
    });
    // write the array
    doc.data.map(data => {
      const obj = {};
      obj["_id"] = data._id;
      obj["ID"] = String(data["ID"]);
      array.push(obj);
    });
    this.setState({ array, headers, datas, reversals: setting.data.reversals });
  }

  deleteData = async (id) => {
    await axios.delete("/api/crm1/user/data/" + id);
    this.componentDidMount();
  }

  login = () => {
    if (this.state.password === "thisisthepassword") {
      this.setState({ login: true });
    } else {
      this.setState({password: ""});
      window.alert("Wrong login information, retry please!");
    }
  }

  updateReversals = async () => {
    await axios.put("/api/crm1/reversals", {reversals: this.state.newReversals});
    this.componentDidMount();
  }

  render() {
    const { array, login, password, datas, headers, reversals, newReversals } = this.state;
    return (
      login ?
        <Container>
          <br />
          <h3 style={{ textAlign: "center" }}>Welcome to CRM1 database</h3>
              <div>
                <hr />
                <div id="spreadsheet">
                  <h4>Spreadsheet Download</h4>
                  <ExportReactCSV data={datas} headers={headers} fileName={"HearingTestData"} />
                  <br /><br />
                  <h5>Legend for data label</h5>
                  <ol>
                    <li>Reversals: the amount of reversals</li>
                    <li>block1: the audio type of block 1</li>
                    <li>trials1: the amount of trials in block 1</li>
                    <li>SNR1: the average SNR of final 10 trials (if there are over 10 trials) in block 1</li>
                    <li>DidWearAids: whether the user has ever worn hearing aids or not</li>
                    <li>WillWearAids: whether the user will hearing aids during this test or not</li>
                    <li>OutPut: Whether the user will use speaker or headphone during the test</li>
                    <li>timer1-t1: how much time (in millisecond) the user took during the block 1 trial 1</li>
                    <li>dbs1-t1: how much decibels the audio has at the end of the block 1 trial 1 (decibel starts from 0 in each block)</li>
                    <li>question1-t1: the real answer in block 1 trial 1</li>
                    <li>answer1-t1: the user's answer in block 1 trial 1</li>
                    <p>(question and answer are composed by 2 digits, the first one is the color: 1 -{">"} red, 2 -{">"} green, 3 -{">"} blue, 4 -{">"} white, and the second one is the number )</p>
                    <li>correct1-t1: whether the user answered the question correct or not in block 1 trial 1</li>
                    <p>(all 1st number represents the # of block, 2nd number represents the # of trial)</p>
                    <li>b1-postQuestion1: the answer for the first post-test question in block 1</li>
                  </ol>
                </div>
                <hr />
                <div id="table">
                  <h4>Data Operation</h4>
                  <Table data={array} deleteData={this.deleteData} />
                  <br /><br />
                  <h5>
                    Pre-questions:
                  </h5>
                  <h6>1. I think my hearing in general is</h6>
                  <h6>2. I think my hearing in quiet is</h6>
                  <h6>3. I think my hearing in background noise is</h6>
                  <h5>
                    Post-questions:
                  </h5>
                  <h6>1. How difficult did you find this experiment? Please make a mark on the line below.</h6>
                  <h6>2. How much effort did it take for you to complete this experiment? Please make a mark on the line below.</h6>
                </div>
                <hr />
                <div id="reversals">
                  <h4>Current Reversals: {reversals}</h4>
                  <TextField label="new reversals" value={newReversals} type="number" onChange={(e) => this.setState({newReversals: Number(e.target.value)})} />
                  <Button color="primary" variant="contained" onClick={this.updateReversals} >Update</Button>
                </div>
                <hr />
                <br />
              </div>
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
