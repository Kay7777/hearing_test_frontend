import React from "react";
import { Container, Button } from "@material-ui/core";

export default (props) => {
  return (
    <Container>
      <h2 style={{ textAlign: "right", marginTop: "5%", marginRight: "5%" }}>
        4
      </h2>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          marginTop: "15%",
        }}
      >
        <h2>
          Make sure you're in a quiet place where you can complete the test
          without distraction!
        </h2>
        <Button
          color="primary"
          variant="contained"
          size="large"
          style={{ margin: 20, width: 200, backgroundColor: "black" }}
          onClick={props.handleClick}
        >
          OK
        </Button>
      </div>
    </Container>
  );
};
