import React from "react";
import axios from "axios";
import UserDataTable from "../../../assets/digits/user-data-table";
import { Container, Button } from "@material-ui/core";

class UserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      one: null,
    };
  }
  componentDidMount = async () => {
    const doc = await axios.get("/api/digits/user/data");
    console.log(doc.data);
    this.setState({ data: doc.data });
  };

  handleDelete = async (id) => {
    await axios.delete("/api/digits/user/data/" + id);
    this.componentDidMount();
  };

  handleShowDetails = (id) => {
    this.state.data.map((data) => {
      if (data._id === id) this.setState({ one: data });
    });
  };

  handleGoBack = () => {
    this.setState({ one: null });
  };

  render() {
    const { data, one } = this.state;
    return (
      <Container>
        <div className="jumbotron">
          <h1 style={{ margin: 20 }}>User Data</h1>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 20 }}
            onClick={() => this.props.history.push("/digits/database")}
          >
            Back
          </Button>
          {one ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ marginLeft: 20 }}
              onClick={this.handleGoBack}
            >
              Back
            </Button>
          ) : null}
        </div>
        <div
          style={{
            position: "relative",
            marginTop: "5%",
          }}
        >
          {one ? (
            <Container>
              <div className="row" style={{ marginLeft: 10 }}>
                <h4>User Email: </h4>
                <h5>{one.email}</h5>
              </div>
              <br />
              <div style={{ marginLeft: 10 }}>
                <h4>Location: </h4>
                <div style={{ marginLeft: 10 }}>
                  <h5>Country: {one.location.country_name}</h5>
                  <h5>State: {one.location.state}</h5>
                  <h5>City: {one.location.city}</h5>
                  <h5>IP: {one.location.IPv4}</h5>
                </div>
              </div>
              <hr />
              <div style={{ marginLeft: 10 }}>
                <h4>Consents: </h4>
                {Object.keys(one.consents).map((key, index) => {
                  return (
                    <div className="row" style={{ marginLeft: 10 }}>
                      <h5>
                        {index}. {key}
                      </h5>
                      <h6 style={{ marginLeft: 10 }}>{one.consents[key]}</h6>
                    </div>
                  );
                })}
              </div>
              <hr />
              <div style={{ marginLeft: 10 }}>
                <h4>Pre-test Questions:</h4>
                {Object.keys(one.hearing).map((key, index) => {
                  return (
                    <div className="row" style={{ marginLeft: 10 }}>
                      <h5>
                        {index + 1}. {key}
                      </h5>
                      <br />
                      <h6 style={{ marginLeft: 10 }}>
                        a. Wellness:{one.hearing[key].wellness}
                      </h6>
                      <br />
                      <h6 style={{ marginLeft: 10 }}>
                        b. Confidence: {one.hearing[key].confidence}
                      </h6>
                    </div>
                  );
                })}
              </div>
              <hr />
              <div style={{ marginLeft: 10 }}>
                <h4>Birth: {one.birth}</h4>
              </div>
              <br />
              <div style={{ marginLeft: 10 }}>
                <h4>Date: {one.date} </h4>
              </div>
              <br />
              <div style={{ marginLeft: 10 }}>
                <h4>Result: {one.result}</h4>
              </div>
              <br />
              <div style={{ marginLeft: 10 }}>
                <h4>Volume: {one.volume}</h4>
              </div>
              <br />
              <div style={{ marginLeft: 10 }}>
                <h4>SNR: {one.SNR}</h4>
              </div>
              <br />
              <div style={{ marginLeft: 10, marginBottom: 30 }} className="row">
                <h4>Timer:</h4>
                <h5 className="row" style={{ marginLeft: 10 }}>
                  {one.timer.map((time) => (
                    <p>{time} / </p>
                  ))}
                </h5>
              </div>
            </Container>
          ) : (
              <UserDataTable
                rows={data}
                handleDelete={this.handleDelete}
                handleShowDetails={this.handleShowDetails}
              />
            )}
        </div>
      </Container>
    );
  }
}

export default UserData;
