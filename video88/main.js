const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contact', (req, res) => {
  res.send('Contact us!');
});

app.get('/blog', (req, res) => {
  res.send('My Blog!');
});

app.get('/blog/:slug', (req, res) => {
  res.send(`${req.params.slug}!`);
});

// app.get('/blog/Intro-to-JS', (req, res) => {
//   res.send('Introduction to the basic concepts of Javascript!');
// });

// app.get('/blog/Asyn-JS', (req, res) => {
//   res.send('Asynchronous Nature of Javascript!');
// });

app.get('/About', (req, res) => {
  res.send('About us!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});