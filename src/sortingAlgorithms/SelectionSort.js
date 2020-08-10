export function getSelectionSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice();

  selectionSort(auxiliaryArray, animations);

  for (let i = 0; i <= array.length - 1; i++) {
    animations.push(["finished", i, i]);
  }

  return animations;
}

function selectionSort(auxiliaryArray, animations) {
  let endIdx = auxiliaryArray.length - 1;

  for (let i = 0; i <= endIdx; i++) {
    // Find minimum element in unsorted array
    let min_idx = i;
    for (let j = i + 1; j <= endIdx; j++) {
      animations.push(["comparison1", min_idx, j]);
      animations.push(["comparison2", min_idx, j]);
      if (auxiliaryArray[j] < auxiliaryArray[min_idx]) {
        min_idx = j;
      }
    }
    // Swap min element with i-th element
    animations.push(["swap", min_idx, auxiliaryArray[i]]);
    animations.push(["swap", i, auxiliaryArray[min_idx]]);

    let min = auxiliaryArray[min_idx];
    auxiliaryArray[min_idx] = auxiliaryArray[i];
    auxiliaryArray[i] = min;
  }
}