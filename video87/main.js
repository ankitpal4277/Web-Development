const fs = require("fs")

console.log(fs)

console.log("starting")

// fs.writeFileSync("ankit.txt", "Ankit is a good boy")

fs.writeFile("Ankit2.txt", "Ankit is a good and nice boy", ()=> {
    console.log("done")
    fs.readFile("ankit.txt", (error, data)=>{
        console.log(error, data.toString())
    })

})

fs.appendFile("ankit.txt", "harry robo", (e,d)=> {
    console.log(d)
})

console.log("ending")