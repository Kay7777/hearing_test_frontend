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
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Output</TableCell>
            <TableCell align="left">Aids</TableCell>
            <TableCell align="left">Birth</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Province</TableCell>
            <TableCell align="left">CRM</TableCell>
            <TableCell align="left">SNR</TableCell>
            <TableCell align="left">Decibel 1</TableCell>
            <TableCell align="left">Decibel 2</TableCell>
            <TableCell align="left">Decibel 3</TableCell>
            <TableCell align="left">Decibel 4</TableCell>
            <TableCell align="left">Timer 1</TableCell>
            <TableCell align="left">Timer 2</TableCell>
            <TableCell align="left">Timer 3</TableCell>
            <TableCell align="left">Timer 4</TableCell>
            <TableCell align="left">Pre-questions</TableCell>
            <TableCell align="left">Post-questions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.data.map(data => {
              return (
                <TableRow>
                  <TableCell align="left">{data.ID}</TableCell>
                  <TableCell align="left">{data.email}</TableCell>
                  <TableCell align="left">{data.output}</TableCell>
                  <TableCell align="left">{data.aids}</TableCell>
                  <TableCell align="left">{data.birth}</TableCell>
                  <TableCell align="left">{data.gender}</TableCell>
                  <TableCell align="left">{data.province}</TableCell>
                  <TableCell align="left">{data.order.map((cycle) => cycle + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.SNR).map((SNR) => SNR + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.dbs1).map(db => db + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.dbs2).map(db => db + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.dbs3).map(db => db + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.dbs4).map(db => db + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.timer1).map(time => time + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.timer2).map(time => time + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.timer3).map(time => time + "/")}</TableCell>
                  <TableCell align="left">{JSON.parse(data.timer4).map(time => time + "/")}</TableCell>
                  <TableCell align="left">{Object.keys(data.preQuestion).map(key => data.preQuestion[key] + "/")}</TableCell>
                  <TableCell align="left">{Object.keys(data.postQuestion).map(key => data.postQuestion[key] + "/")}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
