import React from "react";
import { Button, Container, Checkbox } from "@material-ui/core";

class ICF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  handleChangeCheckedBox = () => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
  }

  render() {
    const { checked } = this.state;
    return (
      <Container>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            marginTop: "10%",
          }}
        >
          <br />
          <img style={{ width: "80%" }} src={process.env.PUBLIC_URL + "/pictures/icf1.png"} />
          <img style={{ width: "80%" }} src={process.env.PUBLIC_URL + "/pictures/icf2.png"} />
          <br />
          <div className="row" style={{ marginLeft: "40%" }}>
            <h5 style={{ marginTop: 10 }}>I agreee with this ICF </h5>
            <Checkbox
              checked={checked}
              color="primary"
              onChange={this.handleChangeCheckedBox}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
          <a href="https://picspie.s3.ca-central-1.amazonaws.com/hearing+test/icf.pdf" target="_blank">Download PDF</a>
          {
            checked ?
              <Button
                variant="contained"
                color="primary"
                style={{ margin: 20, width: 150, backgroundColor: "black" }}
                onClick={this.props.handleClick}
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

          <br /><br /><br /><br /><br /><br />
        </div>
      </Container>
    )
  }
}

export default ICF;
