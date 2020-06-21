export function getMergeSortAnimations(array) {
    let animations  = [];
    let auxiliaryArray = array.slice();
    mergeSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);

    for (let i = 0; i <= auxiliaryArray.length - 1; i++) {
        animations.push(["finished", i]);
    }

    return animations;
}

function mergeSort(auxiliaryArray, startIndex, endIndex, animations) {
    if(startIndex === endIndex)
        return;
    const middleIndex = Math.floor((startIndex + endIndex)/2);
    mergeSort(auxiliaryArray, startIndex, middleIndex, animations);
    mergeSort(auxiliaryArray, middleIndex + 1, endIndex, animations);
    merge(auxiliaryArray, startIndex, middleIndex, endIndex, animations);
}

function merge(auxiliaryArray, startIndex, middleIndex, endIndex, animations) {
    let sortArray = [];
    let i = startIndex;
    let j = middleIndex + 1;
    while(i <= middleIndex && j <= endIndex) {
        // Comparing values at i-th and j-th index, so push to change their color
        animations.push([i, j]);
        // Push them again to revert back to original color
        animations.push([i, j]);
        if(auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Push the swap
            animations.push([sortArray.length + startIndex, auxiliaryArray[i]]);
            sortArray.push(auxiliaryArray[i++]);
        }
        else {
            // Push the swap
            animations.push([sortArray.length + startIndex, auxiliaryArray[j]]);
            sortArray.push(auxiliaryArray[j++]);
        }
    }
    while(i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([sortArray.length + startIndex, auxiliaryArray[i]]);
        sortArray.push(auxiliaryArray[i++]);
    }
    while(j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([sortArray.length + startIndex, auxiliaryArray[j]]);
        sortArray.push(auxiliaryArray[j++]);
    }
    for (let i = startIndex; i <= endIndex; i++) {
        auxiliaryArray[i] = sortArray[i - startIndex];
    }
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}