import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: "90%",
    marginLeft: "5%",
    marginBottom: "5%"
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DenseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center"><b>Without</b><br/>Hearing Aids</TableCell>
            <TableCell align="center"><b>With</b><br/>Hearing Aids</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Object.keys(props.questions).map((q, key) => {
                return <TableRow key={key}>
                <TableCell align="left">{key+1}.</TableCell>
                <TableCell align="left">{q}</TableCell>
                <TableCell align="left">
                  <div className="row">
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "without", "A")}>A</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "without", "B")}>B</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "without", "C")}>C</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "without", "D")}>D</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "without", "E")}>E</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "without", "F")}>F</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "without", "G")}>G</button>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div className="row">
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "with", "A")}>A</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "with", "B")}>B</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "with", "C")}>C</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "with", "D")}>D</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "with", "E")}>E</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "with", "F")}>F</button>
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => props.onChoiceClick(q, "with", "G")}>G</button>
                  </div>
                </TableCell>
              </TableRow>
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
