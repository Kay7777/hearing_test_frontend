import React, { useState } from "react";
import { Button, Container } from "@material-ui/core";

function ICF(props) {

  return (
    <Container>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          marginTop: "20%",
        }}
      >
        <a href="https://picspie.s3.ca-central-1.amazonaws.com/hearing+test/icf.pdf" target="_blank">Download PDF</a>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 20, width: 150, backgroundColor: "black" }}
          onClick={props.handleClick}
        >
          Next
        </Button><br />
        <img style={{ width: "80%" }} src={process.env.PUBLIC_URL + "/pictures/icf1.png"} />
        <img style={{ width: "80%" }} src={process.env.PUBLIC_URL + "/pictures/icf2.png"} />
        <br /><br />
        <br /><br />
      </div>
    </Container>
  );
}

export default ICF;
