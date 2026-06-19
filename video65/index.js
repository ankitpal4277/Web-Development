let arr = []

let size = Number(prompt("Enter the number whose factorial you wish to calculate"));

for (let i = size; i >=1; i--){
    arr.push(i);

}

console.log(arr);

const fact = (a, b)=>{
    return a * b;
}

console.log(arr.reduce(fact))