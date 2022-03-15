let values = [1, 2, 4, 6, 7, 7, 1, 3, 4];
let array1 = values;
let array2 = values;
array1.sort((a, b) => {
  return a - b;
});

console.log(array1, array2);
