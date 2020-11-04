import React from "react";
import axios from "axios";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/sentence/user/data");
    this.setState({ array: doc.data });
  }

  deleteData = async (id) => {
    await axios.delete("/api/sentence/user/data/" + id);
    this.componentDidMount();
  }

  render() {
    const { array } = this.state;
    return (
      <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
        {
          array.map((data) => {
            return (
              <Card style={{ margin: 20 }}>
                <CardContent>
                  <Typography variant="h4" component="h2">
                    SNR: {data.SNR[0]}, {data.SNR[1]}, {data.SNR[2]}, {data.SNR[3]}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {data.date}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button color="danger" size="small" onClick={() => this.deleteData(data._id)}>Delete</Button>
                  <Button color="primary" size="small" onClick={() => this.props.history.push("/signalloss/database/" + data._id)}>Details</Button>
                </CardActions>
              </Card>
            )
          })
        }

      </div>
    );
  }
}

export default Data;
