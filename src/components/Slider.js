import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { green, orange } from '@material-ui/core/colors';

const styles = {
  root: {
    width: 150,
  },
  slider: {
    padding: '22px 0px',
  },
};

const mainTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[50],
    },
  },
});

const sliderMarks = [
    {
      value: 1,
      label: 'Fast'
    },
    {
      value: 5,
      label: 'Medium'
    },
    {
      value: 10,
      label: 'Slow'
    },
  ];

class SimpleSlider extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        value: 1
      };

      this.handleChange = this.handleChange.bind(this);
    }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onUpdate(this.state.value)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ThemeProvider theme={mainTheme}>
          <Typography id='label' color='secondary'>Animation Speed</Typography>
          <Slider
            classes={{ container: classes.slider }}
            value={this.state.value}
            aria-labelledby='label'
            onChange={this.handleChange}
            color='secondary'
            marks={sliderMarks}
            min={1}
            max={10}
            step={null}
          />
        </ThemeProvider>
        
      </div>
    );
  }
}

export default withStyles(styles)(SimpleSlider);