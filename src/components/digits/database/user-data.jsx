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
    this.setState({ data: doc.data });
    console.log(doc.data[0]);
  };

  handleDelete = async (id) => {
    await axios.delete("/api/digits/user/data/" + id);
    this.componentDidMount();
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
        </div>
        <div
          style={{
            position: "relative",
            marginTop: "5%",
          }}
        >
          <Container>
            <h5>Spreadsheet Download</h5>
            
          </Container>
          <Container>
            <h5>Data Operation</h5>
            <UserDataTable
              rows={data}
              handleDelete={this.handleDelete}
              handleShowDetails={this.handleShowDetails}
            />
          </Container>
          <Container>
            <h5>Legend of data labels</h5>
            <ul>
              <li>placeholder</li>
              <li>placeholder</li>
            </ul>
          </Container>
        </div>
      </Container>
    );
  }
}

export default UserData;
