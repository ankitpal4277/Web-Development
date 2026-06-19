let arr = [1, 2, 3 , 4, 5];
let new_arr = [];
for (let i = 0; i < arr.length; i++){
    const element = arr[i];
    new_arr.push(element ** 2);

}

console.log(new_arr)

let newArr = arr.map((e)=>{
    return e**2
})

console.log(newArr)

const greaterThanThree = (e)=>{
    if(e > 3){
        return true;
    }

    else{
        return false;
    }
}

console.log(arr.filter(greaterThanThree))

const add = (a, b)=>{
    return a + b;
}

console.log(arr.reduce(add));
