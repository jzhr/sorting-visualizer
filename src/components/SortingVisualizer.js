import React from 'react';
import { connect } from 'react-redux';
import {Title} from './Title'
import SpeedSlider from './SpeedSlider';
import InputSlider from './InputSlider';
import { selectionSort, insertionSort, bubbleSort, mergeSort, quickSort } from '../sortingAlgorithms/Util';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../styles/SortingVisualizer.css';

const theme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: '#122335',
      disabled: '#c1c1c1'
    },
    primary: {
      light: '#1a3d4d',
      main: '#0d1a27',
      dark: '#1c3652',
    },
    secondary: {
      main: '#e7e7e7',
      dark: '#2cb22c',
    },
  },
});

class SortingVisualizer extends React.Component {

  constructor(props) {
    super();
    this.state = {
      array: [],
      title: 'Select a sorting algorithm',
      resetDisabled: false,
      selectionDisabled: false,
      insertionDisabled: false,
      bubbleDisabled: false,
      mergeDisabled: false,
      quickDisabled: false,
      sortDisabled: false,
      sliderDisabled: false,
      // Default selected sorting algorithm (0: merge)
      selectedAlgo: -1,
    };
  }

  componentDidMount() {
    document.title = 'Sorting Visualizer';
    this.resetArray();
  }

  componentDidUpdate(prevProps) {
    if (this.props.inputSize.value !== prevProps.inputSize.value) {
      let tempTitle = this.state.title;
      this.resetArray();
      this.setState({title: tempTitle});
    }
  }

  resetArray() {
    this.setState({title: 'Select a sorting algorithm'});

    this.enableButtons();
    const array = [];

    for (let i = 0; i < this.props.inputSize.value; i++) {
      array.push(randomIntFromInterval(50, 650));
    }

    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = '#aec6cf';
    }
    this.setState({array});
  }

  disableButtons() {
    this.setState({
      resetDisabled: true,
      selectionDisabled: true,
      insertionDisabled: true,
      bubbleDisabled: true,
      mergeDisabled: true,
      quickDisabled: true,
      sortDisabled: true,
      sliderDisabled: true,
    });
  }

  enableButtons(){
    this.setState({
      selectionDisabled: false,
      insertionDisabled: false,
      bubbleDisabled: false,
      mergeDisabled: false,
      quickDisabled: false,
      sortDisabled: false,
      sliderDisabled: false,
    });
  }

  // Select algorithm to be run when an algorithm button is clicked
  selectSortingAlgorithm(val) {
    if (val === 0) {
      this.setState({
        selectedAlgo: 0,
        selectionDisabled: true,
        insertionDisabled: false,
        bubbleDisabled: false,
        mergeDisabled: false,
        quickDisabled: false,
        title: 'Selection Sort'
      })
    } else if (val === 1) {
      this.setState({
        selectedAlgo: 1,
        selectionDisabled: false,
        insertionDisabled: true,
        bubbleDisabled: false,
        mergeDisabled: false,
        quickDisabled: false,
        title: 'Insertion Sort'
      })
    } else if (val === 2) {
      this.setState({
        selectedAlgo: 2,
        selectionDisabled: false,
        insertionDisabled: false,
        bubbleDisabled: true,
        mergeDisabled: false,
        quickDisabled: false,
        title: 'Bubble Sort'
      })
    } else if (val === 3) {
      this.setState({
        selectedAlgo: 3,
        selectionDisabled: false,
        insertionDisabled: false,
        bubbleDisabled: false,
        mergeDisabled: true,
        quickDisabled: false,
        title: 'Merge Sort'
      })
    } else if (val === 4) {
      this.setState({
        selectedAlgo: 4,
        selectionDisabled: false,
        insertionDisabled: false,
        bubbleDisabled: false,
        mergeDisabled: false,
        quickDisabled: true,
        title: 'Quick Sort'
      })
    }
  }

  // Handler for 'Sort!' button
  runSortingAlgorithm() {
    const arr = this.state.array;
    const speed = this.props.sliderSpeed.value;

    if (this.state.selectedAlgo === 0) {
      this.disableButtons();
      selectionSort(this.setState.bind(this), arr, speed);
    } else if (this.state.selectedAlgo === 1) {
      this.disableButtons();
      insertionSort(this.setState.bind(this), arr, speed);
    } else if (this.state.selectedAlgo === 2) {
      this.disableButtons();
      bubbleSort(this.setState.bind(this), arr, speed);
    } else if (this.state.selectedAlgo === 3) {
      this.disableButtons();
      mergeSort(this.setState.bind(this), arr, speed);
    } else if (this.state.selectedAlgo === 4) {
      this.disableButtons();
      quickSort(this.setState.bind(this), arr, speed);
    }
  }

  render() {
    const {array} = this.state;
    const styles = {
      resetButton: {
        backgroundColor: '#966fd6',
        color: theme.palette.secondary.main
      },
      sortButton: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.main
      },
      stopButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.secondary.main
      }
    }
  
    return (
        <div className='container'>
          <ThemeProvider theme={theme}>
            <AppBar position='static'>
                <Toolbar>
                    <ThemeProvider theme={theme}>
                      <Typography variant='title' color='secondary'>
                        <a href="https://github.com/jzhr/sorting-visualizer" className="sourcelink">Sorting Algorithm Visualizer</a>
                      </Typography>
                    </ThemeProvider>
                    
                    <Box display='inline' m={3}><Button disabled={this.state.resetDisabled} variant='contained' style={styles.resetButton} onClick={() => this.resetArray()}>Reset</Button></Box>
                    <Box display='inline' m={1}><Button disabled={this.state.selectionDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(0)}>Selection Sort</Button></Box>
                    <Box display='inline' m={1}><Button disabled={this.state.insertionDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(1)}>Insertion Sort</Button></Box>
                    <Box display='inline' m={1}><Button disabled={this.state.bubbleDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(2)}>Bubble Sort</Button></Box>
                    <Box display='inline' m={1}><Button disabled={this.state.mergeDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(3)}>Merge Sort</Button></Box>
                    <Box display='inline' m={1}><Button disabled={this.state.quickDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(4)}>Quick Sort</Button></Box>
                    <Box display='inline' m={3}><Button disabled={this.state.sortDisabled} variant='contained' style={styles.sortButton} onClick={() => this.runSortingAlgorithm()}>Sort!</Button></Box>
                    <Box display='inline'><Button variant='contained' style={styles.stopButton} onClick={() => {window.location.reload()}}>Stop</Button></Box>
                    
                    <Box m={5}>
                      <SpeedSlider isDisabled={this.state.sliderDisabled}/>
                    </Box>
                    <Box m={5}>
                      <InputSlider isDisabled={this.state.sliderDisabled}/>
                    </Box>
                </Toolbar>
            </AppBar>
          </ThemeProvider>
          
          <Box m={2}><Title title={this.state.title} color='secondary'></Title></Box>

          <div className='array-container'>
            {array.map((value, idx) => (
              <div
                className='array-bar'
                key={idx}
                style={{
                  backgroundColor: '#aec6cf',
                  height: `${value}px`,
                }}></div>
            ))}
          </div>
        </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const mapStateToProps = (state) => {
  return {
    sliderSpeed: state.sliderSpeed,
    inputSize: state.inputSize
  };
};

export default connect(mapStateToProps)(SortingVisualizer)