import {getMergeSortAnimations} from './MergeSort.js';
import {getSelectionSortAnimations} from './SelectionSort.js';
import {getInsertionSortAnimations} from './InsertionSort';
import {getBubbleSortAnimations} from './BubbleSort';
import {getQuickSortAnimations} from './QuickSort';

// Main color of the array bars
const PRIMARY_COLOR = '#aec6cf';

// Color of array bars that are being compared throughout the animations
const SECONDARY_COLOR = '#ff6961';

// Color of array bars after sorting
const TERTIARY_COLOR = '#77dd77';

export function selectionSort(setState, arr, speed) {
  const animations = getSelectionSortAnimations(arr);

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
      },i * speed);

    } else if (animations[i][0] === "finished") {
      const [temp, barIndex, temp2] = animations[i];
      const barStyle = arrayBars[barIndex].style;

      setTimeout(() => {
        barStyle.backgroundColor = TERTIARY_COLOR;
        setState({
          resetDisabled: false
        })
      },i * speed);

    } else {
      const [temp, barIndex, newHeight] = animations[i];
      const barStyle = arrayBars[barIndex].style;
      setTimeout(() => {
        barStyle.height = `${newHeight}px`;
      },i * speed);  
    }
  }
}

export function insertionSort(setState, arr, speed) {
  const animations = getInsertionSortAnimations(arr);
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
      },i * speed);

    } else if (animations[i][0] === "finished") {
      const [temp, barIndex, temp2] = animations[i];
      const barStyle = arrayBars[barIndex].style;

      setTimeout(() => {
        barStyle.backgroundColor = TERTIARY_COLOR;
        setState({
          resetDisabled: false
        })
      },i * speed);

    } else {
      const [temp, barIndex, newHeight] = animations[i];
      const barStyle = arrayBars[barIndex].style;
      setTimeout(() => {
        barStyle.height = `${newHeight}px`;
      },i * speed);
    }
  }
}

export function bubbleSort(setState, arr, speed) {
  const animations = getBubbleSortAnimations(arr);
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
              },i * speed);

          } else if (animations[i][0] === "finished") {
            const [temp, barIndex] = animations[i];
            const barStyle = arrayBars[barIndex].style;
    
            setTimeout(() => {
              barStyle.backgroundColor = TERTIARY_COLOR;
              setState({
                resetDisabled: false
              })
            },i * speed);

          } else {
              const [barIndex, newHeight] = animations[i];
              if (barIndex === -1) {
                continue;
              }
              const barStyle = arrayBars[barIndex].style;
              setTimeout(() => {
                barStyle.height = `${newHeight}px`;
              },i * speed);  
          }
      }
}

export function mergeSort(setState, arr, speed) {
  const animations = getMergeSortAnimations(arr);
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
      }, i * speed);

    } else if (animations[i][0] === "finished") {
      const [temp, barIndex] = animations[i];
      const barStyle = arrayBars[barIndex].style;

      setTimeout(() => {
        barStyle.backgroundColor = TERTIARY_COLOR;
        setState({
          resetDisabled: false
        })
      },i * speed);

    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * speed);
    }
  }
}

export function quickSort(setState, arr, speed) {
  const animations = getQuickSortAnimations(arr);
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
      },i * speed);

    } else if (animations[i][0] === "finished") {
      const [temp, barIndex] = animations[i];
      const barStyle = arrayBars[barIndex].style;

      setTimeout(() => {
        barStyle.backgroundColor = TERTIARY_COLOR;
        setState({
          resetDisabled: false
        })
      },i * speed);

    } else {
      const [barIndex, newHeight] = animations[i];
      if (barIndex === -1) {
        continue;
      }
      const barStyle = arrayBars[barIndex].style;
      setTimeout(() => {
        barStyle.height = `${newHeight}px`;
      },i * speed);  
    }
  }
}