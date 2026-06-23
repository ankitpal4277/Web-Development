console.log("ankit is a hacker")

setTimeout(() => {
    console.log("I am inside a setTimeoutfuntion")
}, 5000)

console.log("The End");

const fn = () =>{
    console.log("Nothing")
} 


const callback = (arg, fn) => {
    console.log(arg);
    fn()
}


const loadScript = (src, callback) => {
    let sc = document.createElement("Scipt");
    sc.src = src;
    sc.onload = callback("Harry", fn);
    document.head.append(sc)


}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js", callback);