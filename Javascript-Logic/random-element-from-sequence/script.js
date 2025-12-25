// Ahmed => Index 0
// Sayed => Index 1
// Ali => Index 2

let arr = ["Ahmed", "Sayed", "Ali"];

console.log(arr.length); // 3

console.log(Math.random() * arr.length);

console.log(Math.floor(Math.random() * arr.length));
console.log(Math.trunc(Math.random() * arr.length));

console.log(arr[Math.trunc(Math.random() * arr.length)]);
