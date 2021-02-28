import React from "react";
import { Button, Container } from "@material-ui/core";

export default (props) => {
  return (
    <Container>
      <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
        12
      </h2>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          marginTop: "15%",
        }}
      >
        <h2>Thank you for submitting your responses. </h2>
        <h3>You may now close your browser tab.</h3>
        <h3>Don’t forget to check your email for an important message from the researchers.</h3>
      </div>
    </Container>
  );
};
