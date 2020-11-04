import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Use Email</TableCell>
            <TableCell align="left" rowSpan={3}>
              Location
            </TableCell>
            <TableCell align="left">Consents & Questions</TableCell>
            <TableCell align="left">Birth</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Result</TableCell>
            <TableCell align="left">Volume</TableCell>
            <TableCell align="left">SNR</TableCell>
            <TableCell align="left">Timer</TableCell>
            <TableCell align="left">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                {row.location.country_name}
                <br />
                {row.location.state}
                <br />
                {row.location.city}
                <br />
                {row.location.IPv4}
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => props.handleShowDetails(row._id)}
                >
                  Show Details
                </Button>
              </TableCell>
              <TableCell align="left">{row.birth}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.result}</TableCell>
              <TableCell align="left">{row.volume}</TableCell>
              <TableCell align="left">{row.SNR}</TableCell>
              <TableCell align="left">
                <div className="row">
                  {row.timer.map((time) => (
                    <p>{time} / </p>
                  ))}
                </div>
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => props.handleDelete(row._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
