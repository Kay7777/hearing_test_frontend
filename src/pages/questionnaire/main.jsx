import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";


const Questionnaire = (props) => {
  return (
    <div>
      <div className="jumbotron"><h1>Welcome to our collection of Questionnaire</h1></div>
      <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
        <Card style={{ margin: 20 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Aphab A
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => props.history.push("/questionnaire/aphab-a")}>Start</Button>
          </CardActions>
        </Card>
        <Card style={{ margin: 20 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Aphab B
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => props.history.push("/questionnaire/aphab-b")}>Start</Button>
          </CardActions>
        </Card>
        <Card style={{ margin: 20 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              SSQ Long
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => props.history.push("/questionnaire/ssq-long")}>Start</Button>
          </CardActions>
        </Card>
        <Card style={{ margin: 20 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              SSQ Short
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => props.history.push("/questionnaire/ssq-short")}>Start</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default Questionnaire;
