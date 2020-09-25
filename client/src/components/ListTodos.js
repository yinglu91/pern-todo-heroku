import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import axios from 'axios';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // delete todo

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await axios.delete(
        `http://localhost:5000/todos/${id}`
      );

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos');
        console.log(response);
        setTodos(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getTodos();
  }, []);

  console.log(todos);

  return (
    <>
      {/* <h1>List Todos</h1> */}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
