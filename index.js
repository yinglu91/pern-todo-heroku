require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const path = require('path');

// middleware
app.use(cors());
app.use(express.json()); // req.body

// process.env.NODE_ENV => production or undefined

app.use(express.static('./client/build'));

if (process.env.NODE_ENV === 'production') {
  // server static content
  // cd client && npm run build
  app.use(express.static(path.join(__dirname, 'client/build')));
}
console.log(path.join(__dirname, 'client/build'));

// ROUTES //

// create a todo

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    // 'RETURNING *' works for insert/update/delete

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');

    res.json(allTodos.rows);
    console.log(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id=$1', [id]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    );

    res.json('Todo was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ]);

    res.json('Todo was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

// catch all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}.`);
});

// https://www.youtube.com/watch?v=ldYcgPKEZC8
// PERN Stack Course - Postgres, Express, React, and Node 3/19/2020

// deploy
// https://www.youtube.com/watch?v=ZJxUOOND5_A
