import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import '../styles/SortingVisualizer.css';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import {Title} from './Title'
import { spacing } from '@material-ui/system';
import SimpleSlider from './Slider';


// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#157eff';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// Color for bars when sorting is complete
const TERTIARY_COLOR = 'green'



export default class SortingVisualizer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      array: [],
      title: 'Select a sorting algorithm',
      animationSpeed: 1,
      mergeDisabled: false,
      quickDisabled: false,
      sortDisabled: false,
      // Default selected sorting algorithm (0: merge)
      selectedAlgo: -1
    };

    this.updateSpeed = this.updateSpeed.bind(this);
  }

  updateSpeed = (value) => {
       this.setState({
         animationSpeed: value
       });
  }

  disableButtons() {
    this.setState({
      mergeDisabled: true,
      quickDisabled: true,
      sortDisabled: true,
    })
  }

  enableButtons(){
    this.setState({
      mergeDisabled: false,
      quickDisabled: false,
      sortDisabled: false,
    })
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    this.setState({
      title: 'Select a sorting algorithm'
    });

    this.enableButtons()

    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.animationSpeed);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // Select algorithm to be run when an algorithm button is clicked
  selectSortingAlgorithm(val) {
    if (val === 0) {
      this.setState({
        selectedAlgo: 0,
        mergeDisabled: true,
        quickDisabled: false,
        title: 'Merge Sort'
      })
    } else if (val === 1) {
      this.setState({
        selectedAlgo: 1,
        mergeDisabled: false,
        quickDisabled: true,
        title: 'Quick Sort'
      })
    }
  }

  // Handler for 'Sort!'
  runSortingAlgorithm() {
    if (this.state.selectedAlgo === 0) {
      this.disableButtons()
      this.mergeSort()
    } else if (this.state.selectedAlgo === 1) {
      this.disableButtons()
      this.quickSort()
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className='container'>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='title' color='inherit'>
                  Sorting Algorithm Visualizer
                </Typography>
                <Box display='inline' m={3}><Button variant='contained' color='primary' onClick={() => this.resetArray()}>Reset</Button></Box>
                <Box display='inline' m={1}><Button disabled={this.state.mergeDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(0)}>Merge Sort</Button></Box>
                <Box display='inline'><Button disabled={this.state.quickDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(1)}>Quick Sort</Button></Box>
                <Box m={5}>
                  <SimpleSlider onUpdate={this.updateSpeed}/>
                </Box>
                <Box display='inline'><Button disabled={this.state.sortDisabled} variant='contained' color='primary' onClick={() => this.runSortingAlgorithm()}>Sort!</Button></Box>
            </Toolbar>
        </AppBar>

        <Box m={2}><Title title={this.state.title}></Title></Box>

        <div className='array-container'>
          {array.map((value, idx) => (
            <div
              className='array-bar'
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
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

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
