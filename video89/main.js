const express = require('express');
const blog = require('./routes/blog')
const app = express();
const port = 3000;

app.use(express.static("public"))
app.use('/blog', blog)

app.get('/', (req, res) => {
    console.log("this is a get request")
  res.send('Hello World get!');
});

app.post('/', (req, res) => {
    console.log("this is a post request")
  res.send('Hello World post!');
});

app.put('/', (req, res) => {
    console.log("this is a put request")
  res.send('Hello World put!');
});

app.delete('/', (req, res) => {
    console.log("this is a delete request")
  res.send('Hello World delete!');
});

app.get("/index", (req, res) =>{
    console.log("its a get request")
    res.sendFile('templates/index.html', {root: __dirname})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});