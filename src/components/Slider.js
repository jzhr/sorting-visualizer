import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  },
  overrides: {
    MuiSlider: {
      markLabel: {
        color: '#d9d9d9'
      },
      markLabelActive: {
        color: '#ffffff'
      }
    }
  }
});

const sliderMarks = [{
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
  handleChange = (event, value) => {
    this.props.setSpeed(value);
  };

  render() {
    return (
      <div>
        <ThemeProvider theme={mainTheme}>
          <Typography id='label' color='primary'>Animation Speed</Typography>
          <Slider
            value={this.props.sliderSpeed.value}
            aria-labelledby='label'
            onChange={this.handleChange}
            color='primary'
            marks={sliderMarks}
            min={1}
            max={10}
            step={null}
            track={false}
          />
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        sliderSpeed: state.speedReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSpeed: (value) => {
            dispatch({
                type: "SET_SPEED",
                payload: value
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSlider)
