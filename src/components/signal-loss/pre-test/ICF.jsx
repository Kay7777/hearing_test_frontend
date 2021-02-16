import React from "react";
import { Button, Container, Checkbox, TextField, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import PDF from "../../../assets/signal-loss/pdf-reviewer";

class ICF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      email: "",
      show: false
    }
  }

  handleChange = (index) => {
    const { checked1, checked2, checked3, checked4, checked5, checked6, checked7 } = this.state;
    switch (index) {
      case 1:
        return this.setState({ checked1: !checked1 });
      case 2:
        return this.setState({ checked2: !checked2 });
      case 3:
        return this.setState({ checked3: !checked3 });
      case 4:
        return this.setState({ checked4: !checked4 });
      case 5:
        return this.setState({ checked5: !checked5 });
      case 6:
        return this.setState({ checked6: !checked6 });
      case 7:
        return this.setState({ checked7: !checked7 });
      default:
        return null;
    }

  }

  render() {
    const { checked1, checked2, checked3, checked4, checked5, checked6, checked7, show } = this.state;
    return (
      <Container>
        <div>
          <br />
          <div id="icf">
            <div style={{ marginLeft: "10%", marginRight: "10%" }}>
              <h5>Tips: If you think the size of PDF is small, please increase the width of your browser and reload/refresh the page.</h5>
              <h5>Instructions: Please read the two-page information sheet below and complete the
checkbox questions on the second page to consent to participate in this study.</h5>
            </div>

            <PDF showConsents={() => this.setState({ show: true })} />
            {/* <img style={{ width: "80%" }} src={process.env.PUBLIC_URL + "/pictures/icf1.png"} />
            <img style={{ width: "80%" }} src={process.env.PUBLIC_URL + "/pictures/icf2.png"} /> */}
          </div>
          <br />
          {
            show ?
              <div id="consents">
                <div className="row" style={{ marginLeft: 20 }}>
                  <h5 style={{ marginTop: 10 }}>1. Do you understand that you have been asked to be in a research study?</h5>
                  <Checkbox
                    checked={checked1}
                    color="primary"
                    onChange={() => this.handleChange(1)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <h5 style={{ marginTop: 9 }}>Yes</h5>
                </div>
                <div className="row" style={{ marginLeft: 20 }}>
                  <h5 style={{ marginTop: 10 }}>2. Have you read the information at the top of this page?</h5>
                  <Checkbox
                    checked={checked2}
                    color="primary"
                    onChange={() => this.handleChange(2)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <h5 style={{ marginTop: 9 }}>Yes</h5>
                  <a href={process.env.PUBLIC_URL + "/docs/icf.pdf"} target="_blank" style={{ marginTop: 7, marginLeft: 10 }}>
                    A copy of this information can be downloaded here
            </a>
                </div>
                <div className="row" style={{ marginLeft: 20 }}>
                  <h5 style={{ marginTop: 10 }}>3. Do you understand the benefits and risks involved in taking part in this research study?</h5>
                  <Checkbox
                    checked={checked3}
                    color="primary"
                    onChange={() => this.handleChange(3)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <h5 style={{ marginTop: 9 }}>Yes</h5>
                </div>
                <div className="row" style={{ marginLeft: 20 }}>
                  <h5 style={{ marginTop: 10 }}>
                    4. Do you understand that you are free to withdraw from this study at any time without having to give a reason?
            </h5>
                  <Checkbox
                    checked={checked4}
                    color="primary"
                    onChange={() => this.handleChange(4)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <h5 style={{ marginTop: 9 }}>Yes</h5>
                </div>
                <div className="row" style={{ marginLeft: 20 }}>
                  <h5 style={{ marginTop: 10 }}>5. Do you understand that your confidentiality and anonymity will be protected at all times?</h5>
                  <Checkbox
                    checked={checked5}
                    color="primary"
                    onChange={() => this.handleChange(5)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <h5 style={{ marginTop: 9 }}>Yes</h5>
                </div>
                <div className="row" style={{ marginLeft: 20 }}>
                  <h5 style={{ marginTop: 10 }}>6. Do you understand that are free to contact the researchers (jcbhlab@ualberta.ca) if you have any questions about this study?</h5>
                  <Checkbox
                    checked={checked6}
                    label="asdasdasda"
                    color="primary"
                    onChange={() => this.handleChange(6)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <h5 style={{ marginTop: 9 }}>Yes</h5>
                </div>
                <div className="row" style={{ marginLeft: 20 }}>
                  <h5 style={{ marginTop: 10 }}>7. If you wish to be contacted about future studies, please enter your email here:</h5>
                  <TextField style={{ marginTop: 3, marginLeft: 5, width: 200 }} onChange={(e) => this.setState({ email: e.target.value })} />
                </div>
                <div className="row" style={{ marginLeft: 20 }}>
                  <h5 style={{ marginTop: 10 }}>8. I agree to take part in this study:</h5>
                  <RadioGroup aria-label="gender" name="gender1" value={checked7} onChange={() => this.handleChange(7)}>
                    <div className="row" style={{ marginLeft: 10 }}>
                      <FormControlLabel value={true} control={<Radio />} label="Yes" />
                      <FormControlLabel value={false} control={<Radio />} label="No" />
                    </div>
                  </RadioGroup>
                </div>
                {
                  checked1 && checked2 && checked3 && checked4 && checked5 && checked6 && checked7 ?
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: 20, width: 150, backgroundColor: "black" }}
                      onClick={() => this.props.handleClick(this.state.email)}
                    >
                      Next
                    </Button>
                    :
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: 20, width: 150 }}
                      disabled
                    >
                      Next
                    </Button>
                }
              </div>
              :
              null
          }
          <br /><br /><br /><br /><br /><br />
        </div>
      </Container>
    )
  }
}

export default ICF;
