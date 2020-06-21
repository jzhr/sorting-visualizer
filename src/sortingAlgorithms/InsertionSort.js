export function getInsertionSortAnimations(array) {  
      const animations = [];
      const auxiliaryArray = array.slice();
      insertionSort(auxiliaryArray, animations);

      for (let i = 0; i <= array.length - 1; i++) {
        animations.push(["finished", i, i]);
      }
  
      return animations;
  }

  function insertionSort(auxiliaryArray, animations) {
      let endIdx = auxiliaryArray.length - 1;

      for (let i = 1; i <= endIdx; ++i) {
        // Find minimum element in unsorted array
        let key = auxiliaryArray[i];
        let j = i - 1;

        animations.push(["comparison1", j, i]);
        animations.push(["comparison2", j, i]);
        
        while (j >= 0 && auxiliaryArray[j] > key) {
            animations.push(["overwrite", j + 1, auxiliaryArray[j]]);

            auxiliaryArray[j + 1] = auxiliaryArray[j];
            j--;

            if (j >= 0) {
                animations.push(["comparison1", j, i]);
                animations.push(["comparison2", j, i]);
            }
        }
        animations.push(["overwrite", j + 1, key]);
        auxiliaryArray[j + 1] = key;
      }
  }