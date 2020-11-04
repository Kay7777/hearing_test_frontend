import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: "60%",
    marginLeft: 5,
    // marginRight: 20,
  },
});

export default function ContinuousSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleScore(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Slider
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item xs={2}>
          <h6>{value}</h6>
        </Grid>
      </Grid>
    </div>
  );
}
