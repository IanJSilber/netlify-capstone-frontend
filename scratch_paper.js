// dont mind me just testing random things

let values = [1, 2, 4, 6, 7, 7, 1, 3, 4];
let array1 = values;
let array2 = values;
array1.sort((a, b) => {
  return a - b;
});

console.log(array1, array2);

console.log("==================");

let newValues = [1, 2, 4, 6, 7, 7, 1, 3, 4];

let array3 = newValues;
let array4 = [...newValues].sort(); // this works by making a copy of newValues preventing .sort from
// mutating the original

console.log(array3, array4);
