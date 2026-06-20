console.log(document.querySelector(".box"));
console.log(document.querySelector(".box").hasAttribute("style"));
console.log(document.querySelector(".box").attributes);
console.log(document.querySelector(".box").getAttribute("style"));
console.log(document.querySelector(".box").setAttribute("style", "display: inline"));

console.log(document.querySelector(".box").innerHTML);
console.log(document.querySelector(".box").innerHTML = "Hey i am Ankit");
console.log(document.querySelector(".box").innerText);
console.log(document.querySelector(".box").outerText);
console.log(document.querySelector(".box").tagName);

console.log(document.querySelector(".container").innerHTML)
console.log(document.querySelector(".container").innerText)
console.log(document.querySelector(".container").outerHTML)
console.log(document.querySelector(".container").tagName)
console.log(document.querySelector(".container").nodeName)

let div = document.createElement("div");
div.innerHTML = "I have been inserted <b>by ankit</b>"
div.setAttribute("class", "created");
document.querySelector(".container").append(div)

let cont = document.querySelector(".container");
cont.insertAdjacentHTML("afterend", "<b> I am under the water</b>")

console.log(document.querySelector(".container").className)

console.log(document.querySelector(".container").classList)