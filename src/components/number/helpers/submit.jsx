import React from "react";
import { Button } from "@material-ui/core";

export default (props) => {
  return (
    <div>
      <h5>Please click "Submit" button to submit your results</h5>
      <Button
        color="primary"
        variant="contained"
        size="large"
        style={{ margin: 20, width: 200, backgroundColor: "black" }}
        onClick={props.handleSubmit}
      >
        Submit
        </Button>
    </div>
  );
};
