import React, { useState } from 'react';
import axios from 'axios';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // proxy is only use in development so it will be ignored in production
      // so if there is no http://localhost:5000 then by default it is going to use heroku domain
      // remember this heroku app is just our server serving the build static content and also
      // holding the restful api

      // https://pern-todo-app-demo.herokuapp.com/todos
      await axios.post('/todos', { description });

      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-5">Pern Input Todo</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
