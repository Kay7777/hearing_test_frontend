import React from "react";
import { TextField, Button } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FillInFormTable from "../../components/questionnaire/aphab-b/fill-in-form-table";
import QuestionTable from "../../components/questionnaire/aphab-b/question-table";

class AphabB extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      date: null,
      birth: null,
      address: "",
      homePhone: "",
      workPhone: "",
      SSN: "",
      formQuestion: {
        "1": [],
        "2": [],
        "3": []
      },
      choiceQuestion: {
        "The sound of a fire engine siren close by is so loud that I need to cover my ears": {
          without: null,
          with: null
        },
        "When a speaker is addressing a small group, and everyone is listening quietly, I have to strain to understand": {
          without: null,
          with: null
        },
        "It’s hard for me to understand what is being said at lectures or church services": {
          without: null,
          with: null
        },
        "When I’m at the dinner table with several people, and am trying to have a conversation with one person, understanding speech is difficult": {
          without: null,
          with: null
        },
        "When I am in a theater watching a movie or play, and the people around me are whispering and rustling paper wrappers, I can still make out the dialogue": {
          without: null,
          with: null
        },
        "When I’m in a quiet conversation with my doctor in an examination room, it is hard to follow the conversation": {
          without: null,
          with: null
        },
        "When I am listening to the news on the car radio, and family members are talking, I have trouble hearing the news": {
          without: null,
          with: null
        },
        "The sounds of running water, such as a toilet or shower, are uncomfortably loud": {
          without: null,
          with: null
        },
        "When I am having a quiet conversation with a friend, I have difficulty understanding": {
          without: null,
          with: null
        },
        "I can understand conversations even when several people are talking": {
          without: null,
          with: null
        },
        "The sounds of construction work are uncomfortably loud": {
          without: null,
          with: null
        },
        "I have trouble understanding others when an air conditioner or fan is on": {
          without: null,
          with: null
        },
        "I have trouble understanding the dialogue in a movie or at the": {
          without: null,
          with: null
        },
        "Traffic noises are too loud": {
          without: null,
          with: null
        },
        "When I am in a small office, interviewing or answering questions, I have difficulty following the conversation": {
          without: null,
          with: null
        },
        "I miss a lot of information when I’m listening to a lecture": {
          without: null,
          with: null
        },
        "I have to ask people to repeat themselves in one-on-one conversation in a quiet room": {
          without: null,
          with: null
        },
        "Unexpected sounds, like a smoke detector or alarm bell are uncomfortable": {
          without: null,
          with: null
        },
        "I can follow the words of a sermon when listening to a religious service": {
          without: null,
          with: null
        },
        "When I am in a crowded grocery store, talking with the cashier, I can follow the conversation": {
          without: null,
          with: null
        },
        "I can communicate with others when we are in a crowd": {
          without: null,
          with: null
        },
        "The sound of screeching tires is uncomfortably loud": {
          without: null,
          with: null
        },
        " I have difficulty hearing a conversation when I’m with one of my family at home": {
          without: null,
          with: null
        },
        "When I am talking with someone across a large empty room, I understand the words": {
          without: null,
          with: null
        }
      }
    }
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

  handleChoiceClick = (question, type, answer) => {
    const { choiceQuestion } = this.state;
    choiceQuestion[question][type] = answer;
    this.setState({ choiceQuestion });
  }

  checkValidation = () => {
    const { date, birth, name, address, workPhone, homePhone, formQuestion, choiceQuestion } = this.state;
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
    if (!name || !date || !birth || !workPhone || !homePhone || !address) {
      valid = false;
    }

    return valid;
  }

  handleSubmit = () => {
    
  } 

  render(){
    const { date, birth, name, address, workPhone, SSN,  homePhone, formQuestion, choiceQuestion } = this.state;
    return(
      <div style={{ marginTop: "50px" }}>
        <div className="row" id="title" style={{marginLeft: "20%", marginRight: "10%"}}>
            <h3>ABBREVIATED PROFILE OF HEARING AID BENEFIT</h3>
            <h3 style={{position: "fixed", right: "10px"}}>B</h3>
        </div>
        <div id="demo-form" style={{ marginTop: "20px" }}>
          <div className="row" id="nameAndDate" style={{marginLeft: "30px"}}>
            <div className="col-6 row">
              <h5>NAME: </h5><TextField id="name" value={name} onChange={e => this.setState({name: e.target.value})} style={{width: "70%", marginBottom: "10px", marginLeft: "3px"}}/>
            </div>
            <div className="col-3 row">
              <h5 style={{marginRight: "3px"}}>TODAY'S DATE: </h5><DatePicker selected={date} onChange={date => this.setState({date})} />  
            </div>
            <div className="col-3 row">
              <h5 style={{marginRight: "3px"}}>DATE OF BIRTH: </h5><DatePicker selected={birth} onChange={birth => this.setState({birth})} />  
            </div>
          </div>
          <div className="row" id="address" style={{marginLeft: "30px"}}>
            <h5>ADDRESS: </h5><TextField id="name" value={address} onChange={e => this.setState({address: e.target.value})} style={{width: "80%", marginBottom: "10px", marginLeft: "5px"}}/>
          </div>
          <div className="row" id="phone" style={{marginLeft: "30px"}}>
            <h5>TELEPHONE: </h5>
            <p>(home)</p>
            <TextField type="number" id="home" value={homePhone} onChange={e => this.setState({homePhone: e.target.value})} style={{ width:"20%", marginBottom: "10px", marginLeft: "5px"}}/>
            <p>(work)</p>
            <TextField type="number" id="work" value={workPhone} onChange={e => this.setState({workPhone: e.target.value})} style={{ width:"20%",marginBottom: "10px", marginLeft: "5px"}}/>
            <p>(SSN)</p>
            <TextField type="number" id="ssn" value={SSN} onChange={e => this.setState({SSN: e.target.value})} style={{ width:"20%",marginBottom: "10px", marginLeft: "5px"}}/>
          </div>
        </div>
        <div id="checkbox" style={{ marginTop: "20px" }}>
          <FillInFormTable answers={formQuestion} onCheckBoxClick={this.handleCheckBoxClick} />
        </div>
        <div id="instruction" className="row" style={{marginLeft: "40px", marginTop: "20px"}}>
          <div className="col-8" style={{ borderColor: "black", borderStyle: "solid" }}>
            <p>
              <b>
                INSTRUCTIONS: Please circle the answers that come closest to your
                everyday experience. Notice that each choice includes a percentage. You
                can use this to help you decide on your answer. For example, if a
                statement is true about 75% of the time, circle “C” for that item. If you have
                not experienced the situation we describe, try to think of a similar situation
                that you have been in and respond for that situation. If you have no idea,
                leave that item blank.
              </b>
            </p>
          </div>
          <div className="row" style={{marginLeft: "20px"}}>
            <ul  style={{ fontSize: "15px", outlineWidth: "2px", outlineColor: "black", outlineStyle: "auto" }}>
              <li>A Always (99%)</li>
              <li>B Almost Always (87%)</li>
              <li>C Generally (75%)</li>
              <li>D Half-the-time (50%)</li>
              <li>E Occasionally (25%)</li>
              <li>F Seldom (12%)</li>
              <li>G Never (1%)</li>
            </ul>
          </div>
        </div>
        <div id="multiple-choice" style={{marginTop: "20px"}}>
          <QuestionTable questions={choiceQuestion} onChoiceClick={this.handleChoiceClick}/>
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
            >
              Submit
            </Button>
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
              >
                Submit
              </Button>
            </div>
            <p style={{ marginLeft: "10px", marginTop: "10px"}}>You have not completed the questionnaire.</p>
          </div>
        }
      </div>
    )
  }


}

export default AphabB;