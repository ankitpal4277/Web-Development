let boxes = document.getElementsByClassName("box");
console.log(boxes);

boxes[2].style.backgroundColor = "red";

let redBox = document.getElementById("red");
console.log(redBox);

redBox.style.backgroundColor = "green";

document.querySelector(".box").style.backgroundColor = "yellow";   

let allBoxes = document.querySelectorAll(".box");
console.log(allBoxes);

// for(let i = 0; i < allBoxes.length; i++){
//     allBoxes[i].style.backgroundColor = "lightgray";
// }

document.querySelectorAll(".box").forEach(box => {
    box.style.backgroundColor = "lightgray";
})

console.log(document.getElementsByTagName("div"));

console.log(document.getElementsByTagName("div")[0].matches("#red"));
