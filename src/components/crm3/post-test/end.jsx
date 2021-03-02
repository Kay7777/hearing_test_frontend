import React from "react";
import { Button, Container } from "@material-ui/core";

export default (props) => {
  return (
    <Container>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          marginTop: "20%",
        }}
      >
        <h2>Thank you for participating in this test!</h2>
        <h3>Your participant ID is: {props.ID}</h3>
        <h5>You may contact the investigators at jcbhlab@ualberta.ca and use this number to withdraw your data up to one week after you have completed the experiment.</h5>
        <Button variant="contained" color="primary" onClick={() => window.location = "/"} >Back to Main Page</Button>
      </div>
    </Container>
  );
};
