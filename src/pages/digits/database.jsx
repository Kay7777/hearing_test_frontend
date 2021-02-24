import React from "react";
import DataCard from "../../assets/digits/data-card";
import { Container } from "@material-ui/core";

class Database extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Digits Management Main Page</h2>
          <hr />
        </div>
        <Container>
          <div className="row">
            <DataCard
              title="User Database"
              page="/digits/database/userdata"
              description="In this part, you can review users' data"
            />
            <DataCard
              title="Consents questions"
              page="/digits/database/consents"
              description="In this part, you can review consents questions"
            />
            <DataCard
              title="Pre-test questions"
              page="/digits/database/pretest"
              description="In this part, you can review pre-test questions"
            />
            <DataCard
              title="Post-test questions 1"
              page="/digits/database/posttest1"
              description="In this part, you can review post-test questions 1"
            />
            <DataCard
              title="Post-test questions 2"
              page="/digits/database/posttest2"
              description="In this part, you can review post-test questions 2"
            />
            <DataCard
              title="Post-test questions 3"
              page="/digits/database/posttest3"
              description="In this part, you can review post-test questions 3"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default Database;
