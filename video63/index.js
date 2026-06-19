console.log("I am tutorial on Arrays")
let arr = [1, 2, 4, 6, 7];
console.log(arr);
console.log(arr.length);
console.log(arr[3])

arr.push(8);
console.log(arr);
console.log(arr.length);


arr[1] = 55;
console.log(arr);

console.log(typeof arr)
// console.log(arr.toString);
console.log(arr.join(" and "));
arr.pop();
console.log(arr);

arr.push("Ankit");
console.log(arr);
arr.shift()
console.log(arr);
arr.unshift(1);
console.log(arr);

delete arr[4];
console.log(arr)

let ar = [3, 5, 9, 10];
arr =arr.concat(ar);
console.log(arr);

console.log(arr.sort())

for(let i = 0; i<arr.length; i++){
    console.log(i);
    console.log(arr[i]);
}