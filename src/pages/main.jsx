import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";


const Main = (props) => {
  return (
    <div>
      <div className="jumbotron"><h1>Welcome to Hearing Test</h1>
        <h5>
          Tips: Please go to a desktop or laptop computer to complete any of these evaluations. It is recommended that you use any of the following browsers: Chrome, Edge, Firefox, Opera or Safari.
        </h5>
      </div>
      <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
        <Card style={{ margin: 20 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Digits in Noise
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => props.history.push("/digits")}>Start</Button>
          </CardActions>
        </Card>
        <Card style={{ margin: 20 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Sentences in Noise
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => props.history.push("/signalloss")}>Start</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default Main;
