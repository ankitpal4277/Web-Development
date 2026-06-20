let boxes = document.getElementsByClassName("box");

console.log(boxes);

for (let i = 0; i < boxes.length; i ++){
    let random1 = Math.random()*255;
    let random2 = Math.random()*255;
    let random3 = Math.random()*255;

    let trandom1 = Math.random()*255;
    let trandom2 = Math.random()*255;
    let trandom3 = Math.random()*255;

    let current = document.getElementsByClassName("box")[i];

    console.log(current);


    document.getElementsByClassName("box")[i].style.backgroundColor = `rgb(${random1}, ${random2}, ${random3})`;
    document.getElementsByClassName("box")[i].style.color = `rgb(${trandom1}, ${trandom2}, ${trandom3})`;
}