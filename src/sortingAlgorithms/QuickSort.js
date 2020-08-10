export function getQuickSortAnimations(array) {
  let animations = [];
  let auxiliaryArray = array.slice();

  let low = 0;
  let high = array.length - 1;
  quickSort(auxiliaryArray, low, high, animations);

  for (let i = 0; i <= array.length - 1; i++) {
    animations.push(["finished", i]);
  }

  return animations;
}

function quickSort(auxiliaryArray, low, high, animations) {
  let piv_idx;

  if (low < high) {
    piv_idx = partition(auxiliaryArray, low, high, animations);
    quickSort(auxiliaryArray, low, piv_idx - 1, animations);
    quickSort(auxiliaryArray, piv_idx + 1, high, animations);
  }
}

function partition(auxiliaryArray, low, high, animations) {
  // Pivot: element to be placed at right position
  let piv = auxiliaryArray[high];
  let piv_idx = low;

  for (let i = low; i <= high - 1; i++) {
    animations.push([i, high]);
    animations.push([i, high]);
    if (auxiliaryArray[i] <= piv) {
      animations.push([i, auxiliaryArray[piv_idx]]);
      animations.push([piv_idx, auxiliaryArray[i]]);
      swap(auxiliaryArray, i, piv_idx);
      piv_idx++;
    } else {
      animations.push([-1, -1]);
      animations.push([-1, -1]);
    }
    animations.push([-1, -1]);
    animations.push([-1, -1])
  }
  animations.push([-1, -1]);
  animations.push([-1, -1]);
  animations.push([-1, -1]);
  animations.push([-1, -1]);

  animations.push([piv_idx, auxiliaryArray[high]]);
  animations.push([high, auxiliaryArray[piv_idx]]);
  swap(auxiliaryArray, piv_idx, high);
  return piv_idx;
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}