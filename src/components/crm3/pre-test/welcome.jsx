import React from "react";
import { Container } from "@material-ui/core";
import Footer from "../../partials/footer";

export default () => {
  return (
    <Container>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          marginTop: "24%",
        }}
      >
        <h1>Welcome</h1>
      </div>
      <Footer />
    </Container>
  );
};
