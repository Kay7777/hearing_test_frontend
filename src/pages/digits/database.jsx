import React from "react";
import DataCard from "../../assets/digits/data-card";
import { Container } from "@material-ui/core";

class Database extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Fluency Session Tutor Main Page</h2>
          <hr />
        </div>
        <Container>
          <div className="row">
            <DataCard
              title="User Database"
              page="/database/userdata"
              description="In this part, you can review users' data"
            />
            <DataCard
              title="Consents questions"
              page="/database/consents"
              description="In this part, you can review consents questions"
            />
            <DataCard
              title="Pre-test questions"
              page="/database/pretest"
              description="In this part, you can review pre-test questions"
            />
            <DataCard
              title="Post-test questions 1"
              page="/database/posttest1"
              description="In this part, you can review post-test questions 1"
            />
            <DataCard
              title="Post-test questions 2"
              page="/database/posttest2"
              description="In this part, you can review post-test questions 2"
            />
            <DataCard
              title="Post-test questions 3"
              page="/database/posttest3"
              description="In this part, you can review post-test questions 3"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default Database;
