let randomnumber = Math.random();
console.log(randomnumber);

let a = Number(prompt("Enter the first number"));
let b = Number(prompt("Enter the second number"));
let c = prompt("Choose the operation out of these : 1. Addition, 2. Subtraction, 3. Multiplication, 4. Division");

if (c == 1) {
    if (randomnumber < 0.1){
        let result = a - b;
        console.log("The result is ", result)
    }

    else {
        let result = a + b;
        console.log("The result is ", result)
    }
}

else if (c == 2){
    if (randomnumber < 0.1){
        let result = a + b;
        console.log("The result is ", result);
    }

    else {
        let result = a - b;
        console.log("The result is ", result);
    }
}

else if (c == 3){
    if (randomnumber < 0.1){
        let result = a / b;
        console.log("The result is ", result);
    }

    else {
        let result = a * b;
        console.log("The result is ", result);
    }   
}

else {
    if (randomnumber < 0.1){
        let result = a * b;
        console.log("The result is ", result);
    }

    else {
        let result = a / b;
        console.log("The result is ", result);
    }
}