let rand1 = Math.random();
console.log(rand1);
let first , second , third;

if (rand1 < 0.33){
    first = "Crazy";
}

else if (rand1 < 0.66 && rand1 > 0.33){
    first = "Awesome";
}

else {
    first = "Amazing";
}

let rand2 = Math.random();
console.log(rand2);

if (rand2 < 0.33){
    second = "Books";
}

else if (rand2 < 0.66 && rand2 > 0.33){
    second = "Foods";
}

else {
    second = "Garments";
}

let rand3 = Math.random();
console.log(rand3);

if (rand3 < 0.33){
    third = "Limited";
}

else if (rand3 < 0.66 && rand3 > 0.33){
    third = "Exclusive";
}

else {
    third = "Premium";
}


console.log( "Your company name is " + first + " " + second + " " + third);
