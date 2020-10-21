import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";


const Main = (props) => {
  return (
    <div>
      <div className="jumbotron"><h1>Welcome to Hearing Test</h1></div>
      <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
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
        <Card >
          <CardContent>
            <Typography variant="h5" component="h2">
              Digits in Noise
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => props.history.push("/number")}>Start</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default Main;