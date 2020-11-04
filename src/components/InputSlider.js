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
  
class InputSlider extends React.Component {
  handleChange = (event, value) => {
    this.props.setInput(value);
  };

  render() {
    return (
      <div>
        <ThemeProvider theme={mainTheme}>
          <Typography id='label' color='primary'>Input Size</Typography>
          <Slider
            value={this.props.inputSize.value}
            aria-labelledby='label'
            onChange={this.handleChange}
            color='primary'
            disabled={this.props.isDisabled}
            min={50}
            max={350}
            step={5}
            track={false}
            valueLabelDisplay="auto"
          />
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        inputSize: state.inputSize
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setInput: (value) => {
            dispatch({
                type: "SET_INPUT",
                payload: value
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputSlider)
