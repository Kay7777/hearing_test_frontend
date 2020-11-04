import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
            <TableCell align="left">CRM</TableCell>
            <TableCell align="left">SNR</TableCell>
            <TableCell align="left">Decibel</TableCell>
            <TableCell align="left">Timer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">{props.cycle}</TableCell>
            <TableCell align="left">{props.SNR}</TableCell>
            <TableCell align="left">
              {
                props.decibel.map(decibel => decibel + "/")
              }
            </TableCell>
            <TableCell align="left">
              {
                props.timer.map(timer => timer + "/")
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
