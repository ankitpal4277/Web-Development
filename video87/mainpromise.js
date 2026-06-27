import fs from "fs/promises"

let a = await fs.readFile("ankit.txt")

let b = await fs.writeFile("ankit.txt", a)

console.log(a.toString(), b)                  