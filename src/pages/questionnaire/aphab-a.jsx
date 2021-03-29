import React from "react";
import { TextField, Button } from '@material-ui/core';
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
      date: null,
      choiceQuestion: {
        "When I am in a crowded grocery store, talking with the cashier, I can follow the conversation.": {
          with: null,
          without: null
        },
        "I miss a lot of information when I’m listening to a lecture.": {
          with: null,
          without: null
        },
        "Unexpected sounds, like a smoke detector or alarm bell are uncomfortable.": {
          with: null,
          without: null
        },
        "I have difficulty hearing a conversation when I’m with one of my family at home.": {
          with: null,
          without: null
        },
        "I have trouble understanding the dialogue in a movie or at the theater.": {
          with: null,
          without: null
        },
        "When I am listening to the news on the car radio, and family members are talking, I have trouble hearing the news.": {
          with: null,
          without: null
        },
        "When I’m at the dinner table with several people, and am trying to have a conversation with one person, understanding speech is difficult.": {
          with: null,
          without: null
        },
        "Traffic noises are too loud.": {
          with: null,
          without: null
        },
        "When I am talking with someone across a large empty room, I understand the words.": {
          with: null,
          without: null
        },
        "When I am in a small office, interviewing or answering questions, I have difficulty following the conversation.": {
          with: null,
          without: null
        },
        "When I am in a theater watching a movie or play, and the people around me are whispering and rustling paper wrappers, I can still make out the dialogue.": {
          with: null,
          without: null
        },
        "When I am having a quiet conversation with a friend, I have difficulty understanding.": {
          with: null,
          without: null
        },
        "The sounds of running water, such as a toilet or shower, are uncomfortably loud.": {
          with: null,
          without: null
        },
        "When a speaker is addressing a small group, and everyone is listening quietly, I have to strain to understand.": {
          with: null,
          without: null
        },
        "When I’m in a quiet conversation with my doctor in an examination room, it is hard to follow the conversation.": {
          with: null,
          without: null
        },
        "I can understand conversations even when several people are talking.": {
          with: null,
          without: null
        },
        "The sounds of construction work are uncomfortably loud.": {
          with: null,
          without: null
        },
        "It’s hard for me to understand what is being said at lectures or church services.": {
          with: null,
          without: null
        },
        "I can communicate with others when we are in a crowd.": {
          with: null,
          without: null
        },
        "The sound of a fire engine siren close by is so loud that I need to cover my ears.": {
          with: null,
          without: null
        },
        "I can follow the words of a sermon when listening to a religious service.": {
          with: null,
          without: null
        },
        "The sound of screeching tires is uncomfortably loud.": {
          with: null,
          without: null
        },
        "I have to ask people to repeat themselves in one-on-one conversation in a quiet room.": {
          with: null,
          without: null
        },
        "I have trouble understanding others when an air conditioner or fan is on.": {
          with: null,
          without: null
        }
      },
      formQuestion: {
        "1": [],
        "2": [],
        "3": []
      }
    }
  }

  handleChoiceClick = (question, type, answer) => {
    const { choiceQuestion } = this.state;
    choiceQuestion[question][type] = answer;
    this.setState({ choiceQuestion });
  }

  handleCheckBoxClick = (num, choice ) => {
    const { formQuestion } = this.state;
    let array = formQuestion[String(num)];
    if (array.includes(choice)) {
      array = array.filter((value) => value !== choice);
    } else {
      array.push(choice);
    }
    formQuestion[String(num)] = array;
    this.setState({ formQuestion });
  }

  checkValidation = () => {
    const { choiceQuestion, formQuestion, name, date } = this.state;
    let valid = true;
    for (let key in choiceQuestion) {
      if (!choiceQuestion[key].with || !choiceQuestion[key].without) {
        valid = false;
      }
    }
    for (let key in formQuestion){
      if (formQuestion[key].length === 0) {
        valid = false;
      }
    }
    if (!name || !date) {
      valid = false;
    }

    return valid;
  }

  handleSubmit = () => {
    console.log(this.state);
  }


  render(){
    const { name, date, choiceQuestion, formQuestion } = this.state;
    return(
      <div>
        <div id="header" style={{marginTop: "50px"}}>
          <div id="title" style={{textAlign: "center"}}>
            <h3>ABBREVIATED PROFILE OF HEARING AID BENEFIT</h3>
            <h6>FORM A</h6>
          </div>
          <div className="row" id="nameAndDate" style={{marginLeft: "30px"}}>
            <div className="col-7 row">
              <h5>NAME: </h5><TextField id="name" value={name} onChange={e => this.setState({name: e.target.value})} style={{width: "80%", marginBottom: "10px", marginLeft: "5px"}}/>
            </div>
            <div className="col-5 row">
              <h5 style={{marginRight: "5px"}}>Today's date: </h5><DatePicker selected={date} onChange={date => this.setState({date})} />  
            </div>
          </div>
        </div>
        <div className="jumbotron" style={{margin: "20px"}}>
          <div id="instruction">
          <h4>INSTRUCTIONS</h4>
            <div className="row">
              <div className="col-8">
                <p>
                  Please circle the answers that come closest to your
                  everyday experience. Notice that each choice includes a
                  percentage. You can use this to help you decide on your
                  answer. For example, if the statement is true about 75%
                  of the time, circle C for that item. If you have not
                  experienced the situation we describe, try to think of a
                  similar situation that you have been in and respond for
                  that situation. If you have no idea, leave that item blank.
                </p>
              </div>
              <div className="col-4">
                <ul  style={{ fontSize: "15px", outlineWidth: "2px", outlineColor: "black", outlineStyle: "auto" }}>
                  <li><b>A</b> Always (99%)</li>
                  <li><b>B</b> Almost Always (87%)</li>
                  <li><b>C</b> Generally (75%)</li>
                  <li><b>D</b> Half-the-time (50%)</li>
                  <li><b>E</b> Occasionally (25%)</li>
                  <li><b>F</b> Seldom (12%)</li>
                  <li><b>G</b> Never (1%)</li>
                </ul>
              </div>
            </div>
          </div>
          <div id="example">
            <h4>EXAMPLE</h4>
            <p>
              For some items, an answer of “Always (99%)” indicates few problems. Other items are
              written so that an answer of “Always (99%)” indicates a lot of problems. Here is an example.
              In item (a), below, an answer of “Always (99%)” means that you often have problems. In
              item (b), below, the same answer means that you seldom have problems.
            </p>
            <ExampleTable />
          </div>
        </div>
        <div id="questions">
          <div id="multiple-choice">
            <QuestionTable questions={choiceQuestion} onChoiceClick={this.handleChoiceClick}/>
          </div>
          <br />
          <div id="fill-in-form">
            <p style={{marginLeft: "10%"}}><b><i>Please fill out these additional items.</i></b></p>
            <FillInFormTable answers={formQuestion} onCheckBoxClick={this.handleCheckBoxClick} />
          </div>
        </div>
        {
          this.checkValidation() ?
          <div id="submitButton">
            <Button 
              size="large" 
              varian="contained" 
              style={{
                backgroundColor: "black", color: "white", 
                marginLeft: "45%", marginTop: "20px", marginBottom: "20px"
              }}
              onClick={this.handleSubmit}
            >Submit</Button>
          </div>
          :
          <div className="row" style={{marginLeft: "45%", marginTop: "20px", marginBottom: "20px"}}>
            <div id="submitButton">
              <Button 
                size="large" 
                varian="contained" 
                style={{
                  backgroundColor: "black", color: "white", 
                }}
                disabled
              >Submit</Button>
            </div>
            <p style={{ marginLeft: "10px", marginTop: "10px"}}>You have not completed the questionnaire.</p>
          </div>
        }
      </div>
    )
  }
}

export default AphabA;