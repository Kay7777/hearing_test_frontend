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
            <TableCell align="left">Use Id</TableCell>
            <TableCell align="left">Version</TableCell>
            <TableCell align="left">Result</TableCell>
            <TableCell align="left">Volume</TableCell>
            <TableCell align="left">date1</TableCell>
            <TableCell align="left">SNR1</TableCell>
            <TableCell align="left">Timer1</TableCell>
            <TableCell align="left">date2</TableCell>
            <TableCell align="left">SNR2</TableCell>
            <TableCell align="left">Timer2</TableCell>
            <TableCell align="left">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.version}</TableCell>
              <TableCell align="left">{row.result}</TableCell>
              <TableCell align="left">{row.volume}</TableCell>
              <TableCell align="left">{row.date1}</TableCell>
              <TableCell align="left">{row.SNR1}</TableCell>
              <TableCell align="left">
                <div className="row">
                  {row.timer1.map((time) => (
                    <p>{time} / </p>
                  ))}
                </div>
              </TableCell>
              <TableCell align="left">{row.date2}</TableCell>
              <TableCell align="left">{row.SNR2}</TableCell>
              <TableCell align="left">
                <div className="row">
                  {row.timer2.map((time) => (
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
