import React from "react";
import { Button, Container } from "@material-ui/core";

export default (props) => {
  return (
    <Container>
      <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
        11
      </h2>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          marginTop: "15%",
        }}
      >
        <h2>
          You have completed the study. Thank you for your participation. Click
          ‘SUBMIT’ to send your responses to the researchers. Remember to check
          your email afterwards for a message from the researchers containing
          further information about this study.{" "}
        </h2>
        <br />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={props.handleClick}
          style={{
            backgroundColor: "black",
            width: 150,
            marginTop: 10,
          }}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};
