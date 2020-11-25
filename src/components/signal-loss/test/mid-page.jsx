import React from "react";
import { Button, Container } from "@material-ui/core";

export default (props) => {
  return <Container style={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
    <h4>You are now entering block {props.section} of four.</h4>
    <Button
      variant="contained"
      color="primary"
      style={{ margin: 20, width: 150, backgroundColor: "black" }}
      onClick={props.handleClick}>Next</Button>
  </Container>
}