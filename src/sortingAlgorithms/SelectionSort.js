export function getSelectionSortAnimations(array) {
    if (array.length <= 1) return array;
  
    const animations = [];
    let endIdx = array.length - 1;
    const auxiliaryArray = array.slice();
  
    for (let i = 0; i <= endIdx; i++) {
      // Find minimum element in unsorted array
      let min_idx = i;
      for (let j = i + 1; j <= endIdx; j++) {
        animations.push(["comparison1", min_idx, j]);
        animations.push(["comparison2", min_idx, j]);
        if (auxiliaryArray[j] < auxiliaryArray[min_idx]){
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
    
    for (let i = 0; i <= endIdx; i++) {
        animations.push(["finished", i, i]);
    }

    return animations;
  }