console.log("Hello world")
console.log(document.body.childNodes)
console.log(document.body.childNodes[1]);


let cont = document.body.childNodes[1];


console.log(document.body.childNodes[1].childNodes);               
console.log(document.body.childNodes[1].childNodes[1]);               
console.log(document.body.childNodes[1].childNodes[1].childNodes);    

console.log(cont.firstChild)
console.log(cont.firstElementChild);
console.log(cont.lastElementChild);
console.log(cont.lastElementChild.style.color = "red");

console.log(cont.lastElementChild.parentElement)

console.log(cont.children)
console.log(cont.children[3].nextElementSibling)
console.log(cont.children[3].previousElementSibling)
console.log(cont.children[3].previousSibling)