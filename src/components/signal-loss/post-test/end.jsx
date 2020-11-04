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
        <h2>
          Thank you for particapating this test!
        </h2>
        <Button variant="contained" color="primary" onClick={() => window.location = "/"} >Back to Main Page</Button>
      </div>
    </Container>
  );
};
