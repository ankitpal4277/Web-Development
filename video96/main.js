import mongoose from "mongoose"

import express from "express";

import { Todo } from "./models/Todo.js";

let a = await mongoose.connect("mongodb://localhost:27017/todo")

// const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const todo = new Todo({desc: "description of first todo", isDone: false, "days": 3});
  todo.save()
  res.send('Hello World!');
  
});

app.get('/a', async(req, res) => {
  let todo = await Todo.findOne({})
  res.json({title: todo.title, desc: todo.desc, })
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});