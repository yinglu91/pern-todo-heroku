import React, { useState } from 'react';
import axios from 'axios';

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/todos/${todo.todo_id}`, { description });

      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {/* Button to Open the Modal */}
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      {/* The Modal */}
      {/* id="id10" */}
      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            {/* Modal body  */}
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
