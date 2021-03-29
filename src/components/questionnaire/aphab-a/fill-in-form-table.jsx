import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    width: "90%",
    marginLeft: "5%"
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  }
}));

export default function DenseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table}  component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#e9ecef"}}>
            <TableCell align="center"><b>HEARING AID EXPERIENCE:</b></TableCell>
            <TableCell align="center"><b>DAILY HEARING AID USE:</b></TableCell>
            <TableCell align="center"><b>DEGREE OF HEARING<br/>DIFFICULTYM<br/>(without wearing a hearing aid):</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key="row">
            <TableCell align="left">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["1"].includes("None")} 
                    onChange={e => props.onCheckBoxClick(1, "None")} />}
                    label="None"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["1"].includes("Less than 6 weeks")} 
                    onChange={e => props.onCheckBoxClick(1, "Less than 6 weeks")} />}
                    label="Less than 6 weeks"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["1"].includes("6 weeks to 11 months")} 
                    onChange={e => props.onCheckBoxClick(1, "6 weeks to 11 months")} />}
                    label="6 weeks to 11 months"
                  />
                   <FormControlLabel
                    control={<Checkbox checked={props.answers["1"].includes("1 to 10 years")} 
                    onChange={e => props.onCheckBoxClick(1, "1 to 10 years")} />}
                    label="1 to 10 years"
                  />
                   <FormControlLabel
                    control={<Checkbox checked={props.answers["1"].includes("Over 10 years")} 
                    onChange={e => props.onCheckBoxClick(1, "Over 10 years")} />}
                    label="Over 10 years"
                  />
                </FormGroup>
              </FormControl>
            </TableCell>
            <TableCell align="left">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["2"].includes("None")} 
                    onChange={e => props.onCheckBoxClick(2, "None")} />}
                    label="None"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["2"].includes("Less than 1 hour per day")} 
                    onChange={e => props.onCheckBoxClick(2, "Less than 1 hour per day")} />}
                    label="Less than 1 hour per day"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["2"].includes("1 to 4 hours per day")} 
                    onChange={e => props.onCheckBoxClick(2, "1 to 4 hours per day")} />}
                    label="1 to 4 hours per day"
                  />
                   <FormControlLabel
                    control={<Checkbox checked={props.answers["2"].includes("4 to 8 hours per day")} 
                    onChange={e => props.onCheckBoxClick(2, "4 to 8 hours per day")} />}
                    label="4 to 8 hours per day"
                  />
                   <FormControlLabel
                    control={<Checkbox checked={props.answers["2"].includes("8 to 16 hours per day")} 
                    onChange={e => props.onCheckBoxClick(2, "8 to 16 hours per day")} />}
                    label="8 to 16 hours per day"
                  />
                </FormGroup>
              </FormControl>
            </TableCell>
            <TableCell align="left">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["3"].includes("None")} 
                    onChange={e => props.onCheckBoxClick(3, "None")} />}
                    label="None"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["3"].includes("Mild")} 
                    onChange={e => props.onCheckBoxClick(3, "Mild")} />}
                    label="Mild"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={props.answers["3"].includes("Moderate")} 
                    onChange={e => props.onCheckBoxClick(3, "Moderate")} />}
                    label="Moderate"
                  />
                   <FormControlLabel
                    control={<Checkbox checked={props.answers["3"].includes("Moderately-Severe")} 
                    onChange={e => props.onCheckBoxClick(3, "Moderately-Severe")} />}
                    label="Moderately-Severe"
                  />
                   <FormControlLabel
                    control={<Checkbox checked={props.answers["3"].includes("Severe")} 
                    onChange={e => props.onCheckBoxClick(3, "Severe")} />}
                    label="Severe"
                  />
                </FormGroup>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
