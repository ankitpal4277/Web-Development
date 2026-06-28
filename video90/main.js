const express = require('express');

const app = express()
const port = 3000;
const fs = require("fs")

// app.use(express.static("public"))

app.use((req, res, next) => {
    console.log(req.headers)
    req.ankit = "I am ankit";
    fs.appendFileSync("logs.txt", `${Date.now()} is a ${req.method}\n`)
    console.log(`${Date.now()} is a ${req.method}`)
    // res.send("Hacked by Middleware 1")
    next()
})

app.use((req, res, next) => {
    console.log('Middleware 2')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello world' + req.ankit)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

