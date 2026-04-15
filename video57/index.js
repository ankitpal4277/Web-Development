console.log("I am a tutorial on loops.")

let a = 1;
let b = "Ankit"

for(let i = 0; i < 5; i++){
    console.log(i)
}

let obj = {
    name: "Ankit Pal", 
    role: "software Developer",
    Company: "Google"
}

for (const key in obj) {
    console.log(key)
}

for (const value in obj) {
    console.log(obj[value])
}

for (const value in obj) {
    console.log(value)
}

for (const i of b) {
    console.log(i)
}