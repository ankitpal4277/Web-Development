const express = require('express')
const app = express()
const port = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    let sitename = "Adidas"
    let searchtext = "Search Now"
    let arr = [1, 54, 65]
    res.render("index", {sitename: sitename, searchtext: arr})
})

app.get('/', (req, res) => {
    let blogtitle = "Adidas"
    let blogcontent = "Search Now"
    res.render("blogpost", {blogtitle: blogtitle, blogcontent: blogcontent})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})