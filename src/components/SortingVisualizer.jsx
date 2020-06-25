import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/MergeSort.js';
import {getSelectionSortAnimations} from '../sortingAlgorithms/SelectionSort.js';
import {getInsertionSortAnimations} from '../sortingAlgorithms/InsertionSort.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/BubbleSort.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/QuickSort.js';
import '../styles/SortingVisualizer.css';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import {Title} from './Title'

// Number of bars (value) in the array
const NUMBER_OF_ARRAY_BARS = 100;

// Main color of the array bars
const PRIMARY_COLOR = '#aec6cf';

// Color of array bars that are being compared throughout the animations
const SECONDARY_COLOR = '#ff6961';

// Color of array bars after sorting
const TERTIARY_COLOR = '#77dd77';

export default class SortingVisualizer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      array: [],
      title: 'Select a sorting algorithm',
      animationSpeed: 2,
      resetDisabled: false,
      selectionDisabled: false,
      insertionDisabled: false,
      bubbleDisabled: false,
      mergeDisabled: false,
      quickDisabled: false,
      sortDisabled: false,
      // Default selected sorting algorithm (0: merge)
      selectedAlgo: -1,
    };
  }

  componentDidMount() {
    document.title = 'Sorting Visualizer';
    this.resetArray();
  }

  resetArray() {
    this.setState({
      title: 'Select a sorting algorithm'
    });

    this.enableButtons()

    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(50, 650));
    }

    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
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
    })
  }

  enableButtons(){
    this.setState({
      selectionDisabled: false,
      insertionDisabled: false,
      bubbleDisabled: false,
      mergeDisabled: false,
      quickDisabled: false,
      sortDisabled: false,
    })
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
    if (this.state.selectedAlgo === 0) {
      this.disableButtons()
      this.selectionSort()
    } else if (this.state.selectedAlgo === 1) {
      this.disableButtons()
      this.insertionSort()
    } else if (this.state.selectedAlgo === 2) {
      this.disableButtons()
      this.bubbleSort()
    } else if (this.state.selectedAlgo === 3) {
      this.disableButtons()
      this.mergeSort()
    } else if (this.state.selectedAlgo === 4) {
      this.disableButtons()
      this.quickSort()
    }
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = (animations[i][0] === "comparison1") || (animations[i][0] === "comparison2");
      const arrayBars = document.getElementsByClassName('array-bar');

      if(isColorChange === true) {
        const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        },i * this.state.animationSpeed);

      } else if (animations[i][0] === "finished") {
        const [temp, barIndex, temp2] = animations[i];
        const barStyle = arrayBars[barIndex].style;

        setTimeout(() => {
          barStyle.backgroundColor = TERTIARY_COLOR;
          this.setState({
            resetDisabled: false
          })
        },i * this.state.animationSpeed);

      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        },i * this.state.animationSpeed);  
      }
    }
  }

  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = (animations[i][0] === "comparison1") || (animations[i][0] === "comparison2");
      
      if(isColorChange === true) {
        const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        },i * this.state.animationSpeed);

      } else if (animations[i][0] === "finished") {
        const [temp, barIndex, temp2] = animations[i];
        const barStyle = arrayBars[barIndex].style;

        setTimeout(() => {
          barStyle.backgroundColor = TERTIARY_COLOR;
          this.setState({
            resetDisabled: false
          })
        },i * this.state.animationSpeed);

      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        },i * this.state.animationSpeed);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            
            if(isColorChange === true && animations[i][0] !== "finished") {
              const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
              const [barOneIndex, barTwoIndex] = animations[i];
              const barOneStyle = arrayBars[barOneIndex].style;
              const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                  barOneStyle.backgroundColor = color;
                  barTwoStyle.backgroundColor = color;
                },i * this.state.animationSpeed);

            } else if (animations[i][0] === "finished") {
              const [temp, barIndex] = animations[i];
              const barStyle = arrayBars[barIndex].style;
      
              setTimeout(() => {
                barStyle.backgroundColor = TERTIARY_COLOR;
                this.setState({
                  resetDisabled: false
                })
              },i * this.state.animationSpeed);

            } else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                  continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                  barStyle.height = `${newHeight}px`;
                },i * this.state.animationSpeed);  
            }
        }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange && animations[i][0] !== "finished") {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);

      } else if (animations[i][0] === "finished") {
        const [temp, barIndex] = animations[i];
        const barStyle = arrayBars[barIndex].style;

        setTimeout(() => {
          barStyle.backgroundColor = TERTIARY_COLOR;
          this.setState({
            resetDisabled: false
          })
        },i * this.state.animationSpeed);

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
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    
    for (let i = 0; i <= animations.length - 1; i++) {
      const isColorChange = (i % 6 === 0) || (i % 6 === 1);

      if (isColorChange === true && animations[i][0] !== "finished") {
        const color = (i % 6 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        if(barOneIndex === -1) {
          continue;
        }
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        },i * this.state.animationSpeed);

      } else if (animations[i][0] === "finished") {
        const [temp, barIndex] = animations[i];
        const barStyle = arrayBars[barIndex].style;

        setTimeout(() => {
          barStyle.backgroundColor = TERTIARY_COLOR;
          this.setState({
            resetDisabled: false
          })
        },i * this.state.animationSpeed);

      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        },i * this.state.animationSpeed);  
      }
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
                <Box display='inline' m={3}><Button disabled={this.state.resetDisabled} variant='contained' color='primary' onClick={() => this.resetArray()}>Reset</Button></Box>
                <Box display='inline' m={1}><Button disabled={this.state.selectionDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(0)}>Selection Sort</Button></Box>
                <Box display='inline' m={1}><Button disabled={this.state.insertionDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(1)}>Insertion Sort</Button></Box>
                <Box display='inline' m={1}><Button disabled={this.state.bubbleDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(2)}>Bubble Sort</Button></Box>
                <Box display='inline' m={1}><Button disabled={this.state.mergeDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(3)}>Merge Sort</Button></Box>
                <Box display='inline' m={1}><Button disabled={this.state.quickDisabled} variant='contained' color='primary' onClick={() => this.selectSortingAlgorithm(4)}>Quick Sort</Button></Box>
                <Box display='inline' m={3}><Button disabled={this.state.sortDisabled} variant='contained' color='primary.light' onClick={() => this.runSortingAlgorithm()}>Sort!</Button></Box>
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
