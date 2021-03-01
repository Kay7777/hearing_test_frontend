import React from "react";
import { Button, Container } from "@material-ui/core";

export default (props) => {
  return <Container>
    <div style={{ marginTop: "20%", marginLeft: "10%", marginRight: "10%" }}>
      <h4>You are now entering block {props.section} of four.</h4><br />
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 20, width: 150, backgroundColor: "black" }}
        onClick={props.handleClick}>Next</Button>
    </div>

  </Container>
}