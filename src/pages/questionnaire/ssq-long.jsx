import React from "react";
import { TextField, Button, Container } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExampleTable from "../../components/questionnaire/aphab-a/example-table";
import QuestionTable from "../../components/questionnaire/aphab-a/question-table";
import FillInFormTable from "../../components/questionnaire/aphab-a/fill-in-form-table";


class AphabA extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      age: null,
      date: null,
      scaleQuestion: {
        "When I am in a crowded grocery store, talking with the cashier, I can follow the conversation.": null},
      }
  }

  handleChoiceClick = (question, answer) => {
    const { scaleQuestion } = this.state;
    scaleQuestion[question] = answer;
    this.setState({ scaleQuestion });
  }

  checkValidation = () => {
    const { scaleQuestion, age, name, date } = this.state;
    let valid = true;


    return valid;
  }

  handleSubmit = () => {
    console.log(this.state);
  }


  render(){
    const { name, date, age, years, weeks, months, scaleQuestion } = this.state;
    return(
      <div>
        <div id="title" style={{width: "30%", marginLeft: "5%", marginTop: "2%"}}>
          <h3 style={{borderStyle: "solid", width: "100%"}}>Speech Spatial Qualities</h3>
          <h5>Advice about answering the questions</h5>
        </div>
        <br />
        <div id="intro" className="row" style={{margin: "1%"}}>
          <div className="col">
            <h5>
              The following questions inquire about aspects of your
              ability and experience hearing and listening in
              different situations.
            </h5>
            <br />
            <h5>
              For each question, put a mark, such as a cross (x),
              anywhere on the scale shown against each question
              that runs from 0 through to 10. Putting a mark at 10
              means that you would be perfectly able to do or
              experience what is described in the question. Putting
              a mark at 0 means you would be quite unable to do or
              experience what is described.
            </h5>
            <br />
            <h5>
              As an example, question 1 asks about having a
              conversation with someone while the TV is on at the
              same time. If you are well able to do this then put a
              mark up toward the right-hand end of the scale. If
              you could follow about half the conversation in this
              situation put the mark around the mid-point, and so
              on.
            </h5>
            <br />
            <h5>
              <b>We expect that all the questions are relevant to
              your everyday experience, but if a question
              describes a situation that does not apply to you,
              put a cross in the “not applicable” box.</b> Please also
              write a note next to that question explaining why it
              does not apply in your case.
            </h5>
          </div>
          <div className="col">
            <h5 style={{borderStyle: "solid", width: "100%"}}>
              Please answer the following questions, then go on to the questions about your hearing
            </h5><br/>
            <div className="row"><h5>Your name: </h5><TextField id="name" value={name} onChange={e => this.setState({name: e.target.value})} style={{width: "40%", marginBottom: "10px", marginLeft: "5px"}}/></div>
            <div className="row"><h5 style={{marginRight: "5px"}}>Today's date: </h5><DatePicker selected={date} onChange={date => this.setState({date})} />  </div>
            <div className="row"><h5>Your age: </h5><TextField id="age" type="number" value={age} onChange={e => this.setState({age: e.target.value})} style={{width: "20%", marginBottom: "10px", marginLeft: "5px"}}/></div>
            <div id="checkbox">
                <h5><i>Please check one of these options:</i></h5>
                <h6>I have no hearing aid/s</h6>
                <h6>I use one hearing aid (left ear )</h6>
                <h6>I use one hearing aid (right ear)</h6>
                <h6>I use two hearing aids (both ears)</h6>
                <br />
                <h6>If you have been using hearing aid/s, for how long?</h6>
                <div className="row"><TextField id="years" type="number" value={years} onChange={e => this.setState({years: e.target.value})} style={{width: "20%", marginBottom: "10px", marginLeft: "5px", marginLeft: "15%"}}/><h6> year</h6></div>
                <div className="row"><TextField id="months" type="number" value={months} onChange={e => this.setState({months: e.target.value})} style={{width: "20%", marginBottom: "10px", marginLeft: "5px", marginLeft: "15%"}}/><h6> months</h6></div>
                <br/><h6 style={{ marginLeft: "15%"}}>or</h6>
                <div className="row"><TextField id="weeks" type="number" value={weeks} onChange={e => this.setState({weeks: e.target.value})} style={{width: "20%", marginBottom: "10px", marginLeft: "5px", marginLeft: "15%"}}/><h6> weeks</h6></div>
                <p><i>If you have two aids and have used them for different lengths of time, please write down both.</i></p>
            </div>
          </div>
        </div>
        <div id="questions" style={{ borderStyle: "solid", margin: "1%"}}>
          scalequestions
        </div>
      </div>
    )
  }
}

export default AphabA;