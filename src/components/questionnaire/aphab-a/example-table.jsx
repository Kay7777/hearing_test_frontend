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
    backgroundColor: "#e9ecef"
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

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center"><b>Without</b><br/>Hearing Aids</TableCell>
            <TableCell align="center"><b>With</b><br/>Hearing Aids</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key="row1">
            <TableCell align="left">(a)</TableCell>
            <TableCell align="left">When I’m talking with a friend outdoors on a windy day, I miss a lot of the conversation.</TableCell>
            <TableCell align="left">A B C D E F G</TableCell>
            <TableCell align="left">A B C D E F G</TableCell>
          </TableRow>
          <TableRow key="row2">
            <TableCell align="left">(b)</TableCell>
            <TableCell align="left">When I am in a meeting with several other people, I can comprehend speech.</TableCell>
            <TableCell align="left">A B C D E F G</TableCell>
            <TableCell align="left">A B C D E F G</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
