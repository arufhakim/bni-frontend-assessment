let arrOne = [0, 3, 4, 5, 31];
let arrTwo = [4, 6, 7, 30];

// combine array
let combineArr = [...arrOne, ...arrTwo];

let i, temp;
let complete = true;

while (complete) {
  complete = false;
  for (i = 0; i < combineArr.length - 1; i++) {
    if (combineArr[i] > combineArr[i + 1]) {
      temp = combineArr[i];
      combineArr[i] = combineArr[i + 1];
      combineArr[i + 1] = temp;
      complete = true;
    } else {
      continue;
    }
  }
}

console.log(`sorted array: [${combineArr}]`);
